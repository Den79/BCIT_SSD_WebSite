// List view button
const body = document.body;
const listView = document.getElementById('listView');

listView.addEventListener('click', changeView);
listView.addEventListener('mousedown', function(e){
    e.preventDefault();
});

function changeView(){
    body.classList.toggle('changeCalendarView');
}