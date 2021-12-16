import * as React from 'react';
import { useSelector } from 'react-redux';
import H from "@here/maps-api-for-javascript";

const MapsLayout = () => {

    const trashData = useSelector(state => state.Trash);
    const trashDataFull = trashData.filter(item => item.tempat_sampah_isfull === true);
    // console.log(trashData);

    const mapRef = React.useRef(null);

    React.useLayoutEffect(() => {

        if (!mapRef.current) return;
        const platform = new H.service.Platform({
            apikey: "GWnaGmH3NgcwbbgZqQ6xNT5GrVGYWUDKZ7XKc8g7WBU"
        });

        const defaultLayers = platform.createDefaultLayers();
        const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
            center: { lat: -7.084587583796957, lng: 110.41750999650564 },
            zoom: 16,
            pixelRatio: window.devicePixelRatio || 1
        });

        const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));
        const ui = H.ui.UI.createDefault(hMap, defaultLayers);


        // marker svg
        const mainOffice = '<svg xmlns="http://www.w3.org/2000/svg" ' +
            'xmlns:xlink="http://www.w3.org/1999/xlink" ' +
            'aria-hidden="true" role="img" width="4em" ' +
            'height="5em" preserveAspectRatio="xMidYMid meet" ' +
            'viewBox="0 0 82.006 100.036"><path fill="#34495E" ' +
            'd="M40.972 72.92s-38.986.031-38.944.041c.017.865 0 4.022 0 4.022l38.943 23.052l38.944-23.052s-.035-3.198-.008-3.987c-.092-.194-38.935-.076-38.935-.076z"/><path fill="#ECF0F1" d="M40.972 25.95s-38.986.031-38.944.041c.017.865 0 46.996 0 46.996l38.944 23.051l38.944-23.051s-.004-46.171.022-46.96c-.089-.196-38.966-.077-38.966-.077z"/><path fill="#2C3E50" d="M2.028 72.961c.017.865 0 4.022 0 4.022l38.943 23.052V72.92c.001 0-38.986.032-38.943.041z"/><path fill="#BDC3C7" d="M2.028 25.991c.017.865 0 46.996 0 46.996l38.944 23.051V25.95s-38.987.031-38.944.041z"/><path fill="#BDC3C7" d="M40.972 23.986s-40.983.031-40.941.041c.018.865 0 4.022 0 4.022L40.971 52.1l40.94-24.051s-.033-3.198-.008-3.987c-.09-.195-40.931-.076-40.931-.076z"/><path fill="#95A5A6" d="M46.994 54.967l7.004-3.998v12.992l-7.004 3.996v-12.99zm10.007-5.997l7.005-3.998v12.993l-7.005 3.996V48.97zM.034 28.05L40.86 52.034h.111V24.051H.034v.217c.008.758.003 2.276 0 3.141v.641zm66.974 14.924l7.007-3.997v12.991l-7.007 3.997V42.974zM46.994 71.967l7.004-3.998v12.992l-7.004 3.998V71.967zm20.014-11.994l7.007-3.997v12.992l-7.007 3.997V59.973z"/><path fill="#2C3E50" d="M57.008 72.973l7.005-3.997v17.421l-7.005 4.146v-17.57z"/><path fill="#C0392C" d="M57.008 65.973l7.005-3.997v3.992l-7.005 3.997v-3.992z"/><path fill="#ECF0F1" d="M40.972 0L0 24.051l40.972 24.051l41.034-24.051L40.972 0z"/><path fill="#D48A6D" d="M40.972 4.029L5.991 24.051l34.981 20.022l34.981-20.022L40.972 4.029z"/><path fill="#7F8C8D" d="M34.981 54.998L27.992 51v12.992l6.989 3.996v-12.99zm-9.985-5.997l-6.989-3.998v12.994l6.989 3.996V49.001zm-9.985-5.996l-6.989-3.998v12.991l6.989 3.998V43.005zm19.97 28.982l-6.989-3.996v12.99l6.989 3.998V71.987zm-9.985-5.996l-6.989-3.996v12.99l6.989 3.998V65.991zm-9.985-5.996l-6.989-3.998v12.992l6.989 3.998V59.995z"/><path fill="#BDC3C7" d="M74.015 44.598l-7.007 4.372v1.999l7.007-4.372zm0 17l-7.007 4.372v1.999l7.007-4.373zM64.006 50.594l-7.005 4.373v1.998l7.005-4.373zM53.998 56.59l-7.004 4.373v1.998l7.004-4.371zm0 17l-7.004 4.373v1.998l7.004-4.371z"/><path fill="#95A5A6" d="M27.992 56.622v2l6.989 4.371v-1.998zm0 16.99v1.998l6.989 4.373v-2zm-9.985-5.996v1.998l6.989 4.373v-2zm0-16.991v1.998l6.989 4.374v-1.999zM8.019 61.618v1.998l6.992 4.375v-2zm0-16.991v1.999L15.011 51v-1.999z"/><path fill="#AA6F57" d="M40.972 6.029l33.234 19.022l1.747-1L40.972 4.029L5.991 24.051l1.747 1z"/></svg>';

        const trash = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="3em" height="2.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48"><path fill="#B39DDB" d="M30.6 44H17.4c-2 0-3.7-1.4-4-3.4L9 11h30l-4.5 29.6c-.3 2-2 3.4-3.9 3.4z"/><path fill="#7E57C2" d="M38 13H10c-1.1 0-2-.9-2-2s.9-2 2-2h28c1.1 0 2 .9 2 2s-.9 2-2 2z"/></svg>'
        const trashFull = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="3em" height="2.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48"><path fill="#FF8A65" d="M24 21.3L12.7 10L26 1.7L38.3 10z"/><path fill="#FFAB91" d="M24 21.3L12.7 10L17 4.7L38.3 10z"/><path fill="#B39DDB" d="M30.6 44H17.4c-2 0-3.7-1.4-4-3.4L9 11h30l-4.5 29.6c-.3 2-2 3.4-3.9 3.4z"/><path fill="#7E57C2" d="M38 13H10c-1.1 0-2-.9-2-2s.9-2 2-2h28c1.1 0 2 .9 2 2s-.9 2-2 2z"/></svg>'

        //  marker params
        // mainOffice
        const icon_mainOffice = new H.map.Icon(mainOffice)
        const coords_mainOffice = { lat: -7.0850615204707434, lng: 110.4176823076959 }
        const marker_mainOffice = new H.map.Marker(coords_mainOffice, { icon: icon_mainOffice })


        // waypoints
        const waypoints = trashDataFull.map((item) => (
            "" + item.tempat_sampah_current.tempat_sampah_gpslocation.lat + ","
            + item.tempat_sampah_current.tempat_sampah_gpslocation.lon + ""
        ))


        // trash
        trashData.map((item) => (
            hMap.addObject(new H.map.Marker(
                {
                    lat: item.tempat_sampah_current.tempat_sampah_gpslocation.lat,
                    lng: item.tempat_sampah_current.tempat_sampah_gpslocation.lon
                },
                {
                    icon: item.tempat_sampah_isfull == false ? new H.map.Icon(trash) :
                        new H.map.Icon(trashFull)
                }
            ))
        ))


        const routingParams = {
            'routingMode': 'fast',
            'transportMode': 'car',
            'origin': '-7.0850615204707434,110.4176823076959',
            'destination': '-7.0850615204707434,110.4176823076959',
            'via': new H.service.Url.MultiValueQueryParameter(waypoints),
            'return': 'polyline'
        };

        //   lat = "-7.085588";
        //   lon = "110.417997";<< tempat sampah aslinya 


        hMap.addObject(marker_mainOffice);



        const onResult = function (result) {
            if (result.routes.length) {
                result.routes[0].sections.forEach((section) => {
                    let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

                    // let routeLine = new H.map.Polyline(linestring, {
                    //     style: { strokeColor: 'blue', lineWidth: 3 }
                    // });

                    let startMarker = new H.map.Marker(section.departure.place.location);

                    let endMarker = new H.map.Marker(section.arrival.place.location);

                    var routeOutline = new H.map.Polyline(linestring, {
                        style: {
                          lineWidth: 10,
                          strokeColor: 'rgba(0, 128, 255, 0.7)',
                          lineTailCap: 'arrow-tail',
                          lineHeadCap: 'arrow-head'
                        }
                      });
                      // Create a patterned polyline:
                      var routeArrows = new H.map.Polyline(linestring, {
                        style: {
                          lineWidth: 10,
                          fillColor: 'white',
                          strokeColor: 'rgba(255, 255, 255, 1)',
                          lineDash: [0, 2],
                          lineTailCap: 'arrow-tail',
                          lineHeadCap: 'arrow-head' }
                        }
                      );
                      // create a group that represents the route line and contains
                      // outline and the pattern
                      var routeLine = new H.map.Group();
                      
                    routeLine.addObjects([routeOutline, routeArrows]);

                    hMap.addObjects([routeLine, startMarker, endMarker]);

                    hMap.getViewModel().setLookAtData({ bounds: routeLine.getBoundingBox() });
                });
            }
        };

        const router = platform.getRoutingService(null, 8);

        router.calculateRoute(routingParams, onResult,
            function (error) {
                alert(error.message);
            });


        // trashData.map((item) => (

        //     ui.addBubble( new H.ui.InfoBubble(
        //         {
        //             lat: item.tempat_sampah_current.tempat_sampah_gpslocation.lat,
        //             lng: item.tempat_sampah_current.tempat_sampah_gpslocation.lon
        //         },
        //         {
        //             content: '<b>Hello World!</b>'
        //         }
        //     ))
        // ))

        return () => {
            // ui
            ui.getControl('mapsettings')
            ui.getControl('zoom')
            ui.getControl('scalebar')

            // render map
            hMap.dispose();
        };
    }, [mapRef]);

    return (
        <div ref={mapRef} style={{ height: "600px" }} />
    )
}

export default MapsLayout
