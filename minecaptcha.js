document.addEventListener('DOMContentLoaded', e => {
  let challenge = {
    puzzle: [2, 0, 1, 0, 0, 0, 3, 0, 3, 0, 0, 0, 0, 1, 0, 1],
    solution: [false, false, false, false, true, true, false, false, false, true, false, true, false, false, false, false]
  };

  let containers = document.getElementsByClassName('mc');
  for (container of containers) {
    let label = container.querySelector('.mc-label');
    label.addEventListener('click', e => {
      e.preventDefault();

      if (!(label.dataset.state == 'check' || label.dataset.state == 'failed')) return;

      label.dataset.state = 'progress';

      let userSolution = [];

      let popup = document.createElement('DIV');
      popup.classList.add('mc-popup');
      let header = document.createElement('DIV');
      header.classList.add('mc-popup-header');
      let content = document.createElement('DIV');
      content.classList.add('mc-popup-content');
      let confirm = document.createElement('DIV');
      confirm.classList.add('mc-popup-confirm');
      header.innerHTML = '<div>to proceed, click<br>all the pictures of</div><h1>Mines</h1>';
      confirm.innerHTML = 'confirm';

      for (let i = 0; i < challenge.puzzle.length; i ++) {
        userSolution[i] = false;
        let cell = document.createElement('DIV');
        cell.classList.add('mc-popup-cell');
        if (challenge.puzzle[i] > 0) {
          cell.innerText = challenge.puzzle[i];
        } else {
          cell.classList.add('mc-selectable');
          cell.addEventListener('click', e => {
            cell.classList.toggle('mc-selected');
            userSolution[i] = cell.classList.contains('mc-selected');
          });
        }

        content.appendChild(cell);
      }

      confirm.addEventListener('click', e => {
        label.dataset.state = checkSolution(userSolution, challenge.solution) ? 'done' : 'failed';
        container.removeChild(popup);

        container.querySelector('input[type="checkbox"]').checked = label.dataset.state == 'done';
      });

      popup.appendChild(header);
      popup.appendChild(content);
      popup.appendChild(confirm);

      container.appendChild(popup);
    });
  }


  function checkSolution (check, solution) {
    for (i in solution) {
      if (solution[i] !== check[i] && solution[i] !== null) return false;
    }
    return true;
  }
});
