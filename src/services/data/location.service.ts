import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { utilService } from "../util.service";

class LocationService {

    public getCurrentLocation(): Observable<Position> {
        return new Observable<any>((observer: Observer<Position>) => {

            if (utilService.isDefined(navigator.geolocation)) {
                navigator.geolocation.getCurrentPosition(
                    (position: Position) => {
                        console.log('latitude', position.coords.latitude,
                            'longitude', position.coords.longitude);

                        console.log('latitude', position);

                        observer.next(position);
                        observer.complete();
                    },
                    (error_message: any) => {
                        observer.error(error_message);
                        observer.complete();
                    });
            }
            else {
                observer.error("Location api not available");
                observer.complete();
            }
        });
    }

}

export const locationService = new LocationService();