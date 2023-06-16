import { Fields } from "components";
import { Field } from "formik";
import ContainerForm from "modules/container/form";
import ContainerAll from "modules/container/all";
import React from "react";

const index = () => {
    const [menuModal, setMenuModal] = useState();
    return (
        <div className=''>
            <Button type='primary'>ADD</Button>
            <ContainerAll
                url={'/menu'}
                queryKey={'menu'}
            ></ContainerAll>
        </div>
    )
}

export default index;