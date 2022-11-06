function fetchCountries(name) {
  // const searchParams = new URLSearchParams({
  //   fields: name.official,
  // });

  const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
  // ?${searchParams}
  //   ?fields=name.official,capital,population,flags.svg,languages
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export { fetchCountries };
