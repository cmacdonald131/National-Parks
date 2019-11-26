'use strict';

const apiKey='O4eI6FTrhNIUT8edzRxQCHG89pSUJzMfs5tXRe5Y';
const searchURL='https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
    const queryItems= Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');

}

function displayResults(responseJson, maxResults) {
    console.log(responseJson);
    $('results-list').empty();

    for (let i=0; i < responseJson.items.length; i++) {
        $('#results-list').append (`<li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h3>
        <p>${responseJson.data[i].description}</p></li>`);
    }

    $('#results-list').removeClass('hidden');
};

function lookForParks(searchURL, stateSearch, maxResults, apiKey) {
    const params= {
        stateCode: stateSearch,
        limit: maxResults,
    }

    const queryString= formatQueryParams(params);
    const url= searchURL + '?' + queryString + '&api_key=' + apiKey;

    console.log(url);

    fetch(url)
    .then (response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then (responseJson => displayResults(responseJson))
    .catch(err => {
        $('#jsErrorMessage').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
    $('.jsform').on('submit', function() {
        event.preventDefault();
        const stateSearch= $('#jsStateSearch').val();
        const maxResults= $('#jsMaxResults').val();
        lookForParks(searchURL, stateSearch, maxResults, apiKey);
    });
}

$(watchForm);