import React, {Fragment} from "react";

const TableHeader = ({title, field, sortField, sort})=> {
    return (
        <button className="btn btn-link" onClick={()=>sort(field)}>
            {field===sortField ? (<u><strong>{title}</strong></u>) : (<Fragment>{title}</Fragment>) }
        </button>
    )    
}

export default TableHeader;