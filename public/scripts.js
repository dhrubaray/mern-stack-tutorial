const element = React.createElement('div', { title: 'Outer div' },
    React.createElement('h1', { className: 'hello' }, 'Hello World!')
);
ReactDOM.render(element, document.querySelector('#contents'));