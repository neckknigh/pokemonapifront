import * as _ from "lodash";

class UtilService {

    public isEmpty(value: any): boolean {
        return _.isEmpty(value);
    }

    public isEqual(firstValue: any, secondValue: any): boolean {
        return _.isEqual(firstValue, secondValue);
    }

}

export const utilService = new UtilService(); 