function convertDate(date) {
  let day = date.getDate();
  day = day < 10 ? "0" + day : day;
  let month = date.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  const year = date.getFullYear();
  return day + "." + month + "." + year;
}

function renderCard(episode, filmNumber) {
  const episodeCard = document.createElement('div');
  const cardHeader = document.createElement('div');
  const cardBody = document.createElement('div');
  const episodeNumber = document.createElement('h4');
  const title = document.createElement('h5');
  const relise = document.createElement('p');
  const detailsBtn = document.createElement('a');
  const date = new Date(episode.release_date);

  episodeCard.style.width = '18%';
  episodeCard.classList.add('card', 'my-2');
  cardHeader.classList.add('card-header');
  cardBody.classList.add('card-body', 'd-flex', 'flex-column');
  episodeNumber.classList.add('card-title');
  title.classList.add('card-title');
  relise.classList.add('card-text');
  detailsBtn.classList.add('btn', 'btn-primary');

  cardHeader.textContent = `Episode ${episode.episode_id}`;
  title.textContent = episode.title;
  relise.textContent = convertDate(date);
  detailsBtn.textContent = 'Подробнее';
  detailsBtn.style = 'margin-top: auto';
  detailsBtn.href = `?episodeId=${filmNumber}`;
  filmNumber++;

  episodeCard.append(cardHeader);
  episodeCard.append(cardBody);
  cardBody.append(title);
  cardBody.append(relise);
  cardBody.append(detailsBtn);
  return episodeCard;
}

const spinner = document.getElementById('spinner');

export function render(data) {
  const container = document.createElement('div');
  container.classList.add(
    'container',
    'd-flex',
    'justify-content-between',
    'py-4',
    'flex-wrap',
  );
  let filmNumber = 1;

  for (const episode of data.results) {
    const episodeCard = renderCard(episode, filmNumber);
    container.append(episodeCard);
    spinner.style.display = 'none';
  }
  return container;
}
