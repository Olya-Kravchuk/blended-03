import { Container, CountryList, Section, Loader, Heading } from 'components';
import { useEffect, useState } from 'react';
import {getCountries} from "service/countryApi"


export const Home = () => {

  const [countries, setCountries] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const data = await getCountries()
        console.log(data);
        setCountries(data);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])
  return (
    <Section>
      <Container>
        {isLoading && <Loader/>}
        {isError && <Heading title={isError}/>}
        {countries && <CountryList countries={countries} />}
      </Container>
    </Section>
  );
};
