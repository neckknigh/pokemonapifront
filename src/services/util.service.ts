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

}

export const utilService = new UtilService(); 