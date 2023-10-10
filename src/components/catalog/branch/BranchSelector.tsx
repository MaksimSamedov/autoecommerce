import {useApp} from "../../../app/Context";
import {useEffect, useReducer, useState} from "react";
import {Branch} from "../../../api/shop/Branch";
import '../../../styles/catalog/branch/BranchSelector.css'


interface IBranchSelectorProps {
    currentBranch?: Branch|null
    onChange: (branch: Branch) => void
}

export const BranchSelector = ({onChange, currentBranch}: IBranchSelectorProps) => {
    const {shop} = useApp()

    const [ready, setReady] = useState(false)
    const [branches, setBranches] = useState<Branch[]>([])
    const [current, setCurrent] = useState<Branch|null>(currentBranch ?? null)
    const [modal, setModal] = useState(false)

    useEffect(() => {
        shop.getBranches().then(branches => {
            setBranches(branches)
            setReady(true)
        })
    }, [])

    const handleChange = (value: number) => {
        const found = branches.filter(branch => branch.id === value)
        if(found.length === 0){
            return
        }
        const branch: Branch = found[0]
        setCurrent(branch)
        setTimeout(() => onChange(branch), 0)
        setModal(false)
    }

    return (
        <>
            { ready && (
                branches.length > 0 ? (
                    <div className="branch-selector" onClick={e => setModal(true)}>
                        <i className="fas fa-map-marker-alt mr-2"></i>
                        { current ? (
                            <span>{current.address ?? current.name}</span>
                        ) : (
                            <span>Select branches</span>
                        ) }
                    </div>
                ) : (
                    <p>There are no branches yet</p>
                )
            ) }

            { modal && (
                <div className="modal-select-branch">
                    <p className="text-xl mb-4">Select branch</p>
                    <div className="branch-list-wrapper">
                        <div className="branch-list">
                            { branches.map(branch => {
                                return (
                                    <div onClick={() => handleChange(branch.id)}
                                         className={"text-lg mb-4 branch-list-item " + (branch.id === current?.id ? 'active' : '')} key={branch.id}>
                                        <div className="text-lg">{ branch.name }</div>
                                        { branch.address && <div className="text-sm">{ branch.address }</div> }
                                    </div>
                                )
                            }) }
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};