import HostIndexPageHandler from './InsightsExtension/HostIndexPageHandler';

window.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  switch (path) {
    case '/hosts':
      return HostIndexPageHandler();
    default:
      break;
  }
});
