
const baseUrl = "https://api.github.com/users/";

function findRepos(query) {
    const searchUrl = baseUrl + query + "/repos";
    fetch(searchUrl)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
        $("js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson) {
    console.log(responseJson);
    $("#js-results-list").empty();
    for (let i =0; i < responseJson.length; i++) {
        $("#js-results-list").append(
            `<li>
            <p>${responseJson[i].name}
            <a href="${responseJson[i].svn_url}">link to repo</a>
            </li>`
        )};
        $("#js-results").removeClass("hidden");
}

function watchForm() {
    $("form").submit(event => {
        event.preventDefault();
        const query = $("#js-search-repo").val();
        findRepos(query);
    });
}

$(watchForm);