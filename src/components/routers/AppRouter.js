import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../home/Home';
import NotFoundPage from '../routes/notFound/NotFoundPage';
import SurveyPage from '../routes/survey/SurveyPage';
import UpdateSurveyPage from '../routes/survey/UpdateSurveyPage';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/" component={Home} exact/>
                <Route path="/survey/:id" component={SurveyPage}/>
                <Route path="/update/:id" component={UpdateSurveyPage}/>
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;