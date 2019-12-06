import { Component } from '@angular/core';
import * as L from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {LeafletMarkerClusterModule} from '@asymmetrik/ngx-leaflet-markercluster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'map-sql';
  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, minZoom: 9, attribution: '...' })
    ],
    zoom: 9,
    center: L.latLng(55.751999, 37.617734)
  };
  layersControl = {
    baseLayers: {
      'Open Street Map': L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
      'Open Cycle Map': L.tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
      'Fuck you Dubninsky': L.geoJSON()
    },
    overlays: {
      'Big Circle': L.circle([ 55.4723, 37.37222 ], { radius: 5000 }),
      'Big Square': L.polygon([[ 55.4723, 37.37225 ], [ 46.9, -121.55 ], [ 46.9, -121.7 ], [ 46.8, -121.7 ]])
    }
  };

	// Marker cluster stuff
	markerClusterGroup: L.MarkerClusterGroup;
	markerClusterData: L.Marker[] = [];
	markerClusterOptions: L.MarkerClusterGroupOptions;

	// Generators for lat/lon values
	generateLat() { 
    let a = '37.35'+Math.ceil(Math.random()*100000);
    return +a; }
  generateLon() { 
    let a = '55.45'+Math.ceil(Math.random()*100000);
  return +a;
}


	ngOnInit() {

		this.refreshData();

	}

	markerClusterReady(group: L.MarkerClusterGroup) {
		this.markerClusterGroup = group;
	}

	refreshData(): void {
		this.markerClusterData = this.generateData(1000);
	}

	generateData(count: number): L.Marker[] {
		const data: L.Marker[] = [];
		for (let i = 0; i < count; i++) {
			data.push(L.marker([ this.generateLon(), this.generateLat() ]).bindPopup('A pretty CSS3 popup.<br> Easily customizable.'));
		}

		return data;

	}

}
