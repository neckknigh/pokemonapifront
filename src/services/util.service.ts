import * as _ from "lodash";

class UtilService {

    public isEmpty(value: any): boolean {
        return _.isEmpty(value);
    }

    public isEqual(firstValue: any, secondValue: any): boolean {
        return _.isEqual(firstValue, secondValue);
    }

    public merge(first: any, second: any): any {
        return _.merge(first, second);
    }

    public includes(collection: any, element: any): boolean {
        return _.includes(collection, element)
    }

    public isUndefined(value: any): boolean {
        return _.isUndefined(value);
    }

    public isDefined(value: any): boolean {
        return !_.isUndefined(value);
    }

    /**
     * Permite obtener la representación en cadena
     * de un array separados por espacio en blanco.
     */
    public getArrayItemsAsString(array: string[]): string {
        return array.join(" ");
    }

}

export const utilService = new UtilService(); 