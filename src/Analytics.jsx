import { useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { analytics, firebaseConfig } from './auth/firebase';


function Analytics() {
    useEffect(() => {
        analytics().logEvent('button_click', { button_name: 'signposting_button' });
    }, []);

    return (
        <Container>
            <Button
                variant="primary"
                onClick={() => {
                    analytics().logEvent('button_click', { button_name: 'signposting_button' });
                }}
            >
                Press me
            </Button>
        </Container>
    );
}

export default Analytics;