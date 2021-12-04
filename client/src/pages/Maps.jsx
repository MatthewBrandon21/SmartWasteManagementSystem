import React from 'react'
import MapsLayout from '../components/mapslayout/MapsLayout'
import { Icon } from '@iconify/react';

const Maps = () => {
    return (
        <div>
            <link rel="stylesheet" type="text/css" href="https://js.api.here.com/v3/3.1/mapsjs-ui.css" />

            <h2 className="page-header">
                <Icon icon="bx:bxs-map-alt" /> Maps
            </h2>

            <div className="row">

                <div className="col-12">
                    <div className="card">
                        <div className="card__header">
                            <h3><Icon icon="bx:bx-map-alt" /> trash maps</h3><sub>~ region</sub>
                        </div>
                        <div className="card__body">
                            <MapsLayout />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Maps