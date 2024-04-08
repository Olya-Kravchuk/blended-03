import { Container, CountryInfo, Heading, Loader, Section } from 'components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCountry } from 'service/countryApi';

export const Country = () => {
  const { countryId } = useParams();
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    if (!countryId) return;
    const getDetails = async () => {
      setIsLoading(true);
      try {
        const country = await fetchCountry(countryId);
        setCountry(country);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getDetails();
  }, [countryId]);
  return (
    <Section>
      <Container>
        {isLoading && <Loader />}
        {isError && <Heading title={isError} />}
        {country && <CountryInfo country={country} />}
        <Heading title="SearchCountry" bottom />
      </Container>
    </Section>
  );
};
