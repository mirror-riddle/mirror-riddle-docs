const eventSource = new EventSource('http://127.0.0.1:4000/event');

eventSource.addEventListener('cur_time', event => {
  const data = JSON.parse(event.data);
  const div = document.querySelector('div#cur_time');
  div.innerText = new Date(data.time);
});