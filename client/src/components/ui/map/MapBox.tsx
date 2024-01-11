import { TResponseCampground } from '@components/campgrounds/types';
import mapboxgl, { GeoJSONSource, LngLatLike, Map, MapLayerMouseEvent } from 'mapbox-gl';
import { FC, useEffect, useRef } from 'react';

// Extend the GeoJsonProperties type
interface ExtendedGeoJsonProperties
  extends GeoJSON.Feature<GeoJSON.Geometry, ExtendedGeoJsonProperties> {
  popUpMarkup: string;
}
type Props = {
  campgroundsData: TResponseCampground[];
};

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const MapBox: FC<Props> = ({ campgroundsData }) => {
  const mapContainerRef = useRef(null);
  const positionRef = useRef<LngLatLike>(
    campgroundsData.length === 0
      ? [130.38342385048765, 33.59000491119994]
      : (campgroundsData[Math.floor(Math.random() * campgroundsData.length)].geometry
          .coordinates as LngLatLike)
  );
  const zoomRef = useRef(3);

  // Initialize map when component mounts
  useEffect(() => {
    const geoData = {
      type: 'FeatureCollection',
      features: campgroundsData
    } as { type: 'FeatureCollection'; features: any[] };

    const map: Map = new Map({
      container: mapContainerRef.current!,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: positionRef.current,
      zoom: zoomRef.current
    });

    map.on('load', () => {
      map.addSource('geoData', {
        type: 'geojson',
        data: geoData,
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
      });

      map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'geoData',
        filter: ['has', 'point_count'],
        paint: {
          // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#51bbd6',
            25,
            '#f1f075',
            50,
            '#f28cb1'
          ],
          'circle-radius': ['step', ['get', 'point_count'], 15, 25, 20, 50, 25]
        }
      });

      map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'geoData',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': ['get', 'point_count_abbreviated'],
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12
        }
      });

      map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'geoData',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': '#11b4da',
          'circle-radius': 6,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff'
        }
      });

      // inspect a cluster on click
      map.on('click', 'clusters', (e: MapLayerMouseEvent) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ['clusters']
        });

        if (features && features.length > 0) {
          const clusterId: number | undefined = features[0].properties
            ?.cluster_id as number;

          if (clusterId !== undefined) {
            const source = map.getSource('geoData') as GeoJSONSource;
            if (source) {
              source.getClusterExpansionZoom(clusterId, (err: any, zoom: number) => {
                if (!err) {
                  map.easeTo({
                    center:
                      features[0].geometry.type === 'Point'
                        ? (features[0].geometry.coordinates as LngLatLike)
                        : [0, 0],
                    zoom
                  });
                }
              });
            }
          }
        }
      });

      // When a click event occurs on a feature in
      // the unclustered-point layer, open a popup at
      // the location of the feature, with
      // description HTML from its properties.
      map.on('click', 'unclustered-point', (e: MapLayerMouseEvent) => {
        const features = e.features;
        if (features === undefined) return;

        const coordinates: [number, number] =
          features[0].geometry.type === 'Point'
            ? (features[0].geometry.coordinates as [number, number])
            : [0, 0];
        const popUpMarkup = (features[0].properties as ExtendedGeoJsonProperties)
          .popUpMarkup;

        // Ensure that if the map is zoomed out such that
        // multiple copies of the feature are visible, the
        // popup appears over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup().setLngLat(coordinates).setHTML(popUpMarkup).addTo(map);
      });
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Clean up on unmount
    return () => map.remove();
  }, [campgroundsData]);

  return <div ref={mapContainerRef} style={mapStyled} />;
};

export default MapBox;

const mapStyled = {
  margin: '0 0 2rem 0',
  height: '300px',
  width: '100%'
};
