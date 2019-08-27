import * as _ from "lodash";
import { Account } from "../models/account.model";
import * as uniqid from "uniqid";

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

    public getUserFullName(userInfo: Account): string {

        if (this.isEmpty(userInfo)) {
            return "";
        }

        return `${userInfo.name} ${userInfo.lastName}`;
    }

    public replaceParamsInString(text: string, params: any): string {
        let returnedText = text;
        const paramsKeys: string[] = Object.keys(params);

        if (paramsKeys.length) {
            paramsKeys.forEach((keyParam: string) => {
                let regex = new RegExp(":" + keyParam, "g");
                returnedText = returnedText.replace(regex, params[keyParam]);
            });
        }

        return returnedText;
    }


    // TODO: No usar hasta verificar que el mecanismo de getUniqueID presente problemas
    private uniqueIDNotUsed() {
        function chr4() {
            return Math.random().toString(16).slice(-4);
        }
        return chr4() + chr4() +
            '-' + chr4() +
            '-' + chr4() +
            '-' + chr4() +
            '-' + chr4() + chr4() + chr4();
    }

    public getUniqueID() {
        //TODO: Volver doo- una constante.
        return uniqid.process("doo-");
    }

}

export const utilService = new UtilService(); 