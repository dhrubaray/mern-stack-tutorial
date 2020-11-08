/* const initialIssues = [
    {
        id: 1, status: 'New', owner: 'Ravan', effort: 5,
        created: new Date('2018-08-15'), due: undefined,
        title: 'Error in console when clicking Add',
    },
    {
        id: 2, status: 'Assigned', owner: 'Eddie', effort: 14,
        created: new Date('2018-08-16'), due: new Date('2018-08-30'),
        title: 'Missing bottom border on panel',
    },
]; */

/* const sampleIssue = {
    status: 'New', owner: 'Pieta',
    title: 'Completion date should be optional',
}; */

class IssueRow extends React.Component {
    render() {
        const issue = this.props.issue;
        return (
            <tr className={issue.status}>
                <td>{issue.id}</td>
                <td>{issue.status}</td>
                <td>{issue.owner}</td>
                <td>{issue.created ? issue.created.toDateString() : ''}</td>
                <td>{issue.effort}</td>
                <td>{issue.due ? issue.due.toDateString() : ''}</td>
                <td>{issue.title}</td>
            </tr>
        );
    }
}

class IssueFilter extends React.Component {
    render() {
        return (
            <div>This is a placeholder for the issue filter.</div>
        );
    }
}
class IssueTable extends React.Component {
    render() {
        const issueRows = this.props.issues.map(issue =>
            <IssueRow key={issue.id} issue={issue} />
        );
        return (
            <table className="bordered-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Status</th>
                        <th>Owner</th>
                        <th>Created</th>
                        <th>Effort</th>
                        <th>Due Date</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {issueRows}
                </tbody>
            </table>
        );
    }
}

class IssueAdd extends React.Component {
    constructor() {
        super();
        /* setTimeout(() => {
            this.props.createIssue(sampleIssue);
        }, 2000); */
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    render() {
        return (
            <form name="issueAdd" onSubmit={this.handleSubmit}>
                <input type="text" name="owner" placeholder="Owner" />
                <input type="text" name="title" placeholder="Title" />
                <button>Add</button>
            </form>
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.issueAdd;
        const issue = Immutable.Map({
            owner: form.owner.value, title: form.title.value, status: 'New',
        });
        this.props.createIssue(issue);
        form.owner.value = ""; form.title.value = "";
    }
}

class IssueList extends React.Component {
    constructor() {
        super();
        localStorage.clear();
        this.state = Immutable.Map({ issues: Immutable.List() });
        this.createIssue = this.createIssue.bind(this);
    }
    componentDidMount() {
        this.loadData();
    }
    loadData() {
        /* setTimeout(() => {
            this.setState({ issues: initialIssues });
        }, 500); */
        let state = localStorage.getItem('state');
        if (state) {
            state = JSON.parse(state);
            state.issues.forEach(issue => {
                issue.created = issue.created ? new Date(issue.created) : '';
                issue.due = issue.due ? new Date(issue.due) : '';
            });
            this.setState(state);
            console.log(state);
        }
    }
    createIssue(issue) {
        issue = issue.set('id', this.state.issues.count() + 1)
        .set('created', new Date());
        this.setState(this.state.set('issues', this.state.get('issues').push(state)),
         () => {
            localStorage.setItem('state', JSON.stringify(this.state));
            console.log(localStorage.getItem('state'));
        });
    }
    render() {
        return (
            <React.Fragment>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable issues={this.state.issues} />
                <hr />
                <IssueAdd createIssue={this.createIssue} />
            </React.Fragment>
        );
    }
}
const element = <IssueList />;
ReactDOM.render(element, document.getElementById('contents'));