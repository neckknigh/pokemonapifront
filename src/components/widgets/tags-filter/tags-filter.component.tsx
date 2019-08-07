import React, { Component } from 'react';
import "./tags-filter.component.scss";

class TagsFilterComponent extends Component<{}, {}> {

    public render() {
        return (
            <div className="flex-row-start-items-baseline-wrap tags-filter-container">
                <div className="hint-container">
                    <p className="hint">Filtros:</p>
                </div>
                <div className="flex-row-center-items-center tag-container clickable">
                    <span className="hint">Domicilio Gratis</span>
                </div>
                <div className="flex-row-center-items-center tag-container clickable">
                    <span className="hint">Valor domicilio</span>
                </div>
                <div className="flex-row-center-items-center tag-container clickable">
                    <span className="hint">Precios</span>
                </div>
                <div className="flex-row-center-items-center tag-container clickable">
                    <span className="hint">Categoría</span>
                </div>
                <div className="flex-row-center-items-center tag-container clickable">
                    <span className="hint">Siguiendo</span>
                </div>
                <div className="flex-row-center-items-center tag-container clickable">
                    <span className="hint">No he comprado</span>
                </div>


            </div>
        );
    }
}

export default TagsFilterComponent;
