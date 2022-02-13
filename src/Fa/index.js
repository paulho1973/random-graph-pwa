import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

const Fa = () => {
	return (
		<div>
			<h1>Fa</h1>	
            <h1><FontAwesomeIcon icon={faCoffee} /></h1>
			<h1><FontAwesomeIcon icon={faBars} /></h1>
			<h1><FontAwesomeIcon icon={faTimes} /></h1>	
		</div>
	);
}

export default Fa;