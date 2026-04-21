const params = new URLSearchParams(window.location.search);
const page = params.get('page');

if (page != null) {
    const new_url = window.location.protocol + "//" + window.location.host + "/" + page;
    window.history.replaceState({}, page, new_url);
}
