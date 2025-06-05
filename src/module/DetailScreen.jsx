import React, { useEffect, useState } from "react";
import { Container, Card, CardHeader, CardBody } from "reactstrap";
import { useParams } from "react-router-dom";
import { DateTime } from "asab_webui_components";
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap'; 


export function DetailScreen() {
    const { id } = useParams();
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        setError(null);

        async function fetchData() {
            try {
                const response = await fetch(`https://devtest.teskalabs.com/detail/${id}`);
                if (!response.ok) {
					throw new Error("HTTP error");
				}
                const json = await response.json();
                console.log(json)
                setDetail(json);
            } catch (error) {
                console.log("There has been error with fetching data");
				setError(error);
            }
            setLoading(false);
        }

        fetchData();
    }, [id]);

    if (loading) {
        return <Container>Loading data...</Container>;
    }
    
    if (error) {
        return <Container>Error loading data</Container>;
    }

    if (!detail) {
        return <Container>Error with data</Container>;
    }

   return (
    <Container>
        <Button color="secondary" onClick={() => navigate('/')}>
            ← {'Back'}
        </Button>
       <Card>
            <CardHeader>Detail for: {detail.username}</CardHeader>
            <CardBody>
                <p><strong>Email:</strong> {detail.email}</p>
                <p><strong>Created:</strong> <DateTime value={detail.created} /></p>
            </CardBody>
      </Card>
    </Container>
    );
}

