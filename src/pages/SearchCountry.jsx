import {
  Container,
  Heading,
  Section,
  SearchForm,
  CountryList,
  Loader,
} from 'components';
import { useEffect, useState } from 'react';
import { fetchByRegion } from 'service/countryApi';

export const SearchCountry = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    if (!query) return;
    const getCountries = async () => {
      setIsLoading(true);
      try {
        const data = await fetchByRegion(query);
        setCountries(data);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getCountries();
  }, [query]);

  const handleSubmit = query => {
    setQuery(query);
  };

  return (
    <Section>
      <Container>
        {isLoading && <Loader />}
        {isError && <Heading title={isError} />}
        <SearchForm handleSubmit={handleSubmit} />
        <CountryList countries={countries} />
      </Container>
    </Section>
  );
};
