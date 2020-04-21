import React from 'react';
import {Scene, Router} from 'react-native-router-flux'
import {TranslatePage} from './TranslatePage'

const RouterComp = () => {
    return (
        <Router>
            <Scene
                key='translate'
                component={TranslatePage}
                initial />
        </Router>
    )
}

export default RouterComp;