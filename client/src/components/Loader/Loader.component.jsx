// React
import React from 'react';
import { Oval } from  'react-loader-spinner'

const Loader = () => {
    return (
        <div className='loader'>
            <Oval
                height={80}
                width={80}
                color='rgb(34, 191, 41)'
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor='rgb(232, 248, 245)'
                strokeWidth={2}
                strokeWidthSecondary={2}

            />
        </div>
    );
}

export default Loader;