import { BsSearch } from 'react-icons/bs'
import './index.css'
const FiltersGroup = props => {

    const onEnterSearchInput = event => {
        const { enterSearchInput } = props
        if (event.key === 'Enter') {
            enterSearchInput()
        }
    }
    const onChangeSearchInput = event => {
        const { changeSearchInput } = props
        changeSearchInput(event.target.value)
        
    }
    const renderSearchInput = () => {
        const { searchInput, enterSearchInput, } = props
        return (
            <div className="search-input-container">
                <input
                    value={searchInput}
                    type="search"
                    className="search-input"
                    placeholder="Search"
                    onChange={onChangeSearchInput}
                    onKeyDown={onEnterSearchInput}
                />
                <BsSearch className="search-icon"
                    onClick={enterSearchInput} />
            </div>
        )
    }
    return (
        <div className="filters-group-container">
            {renderSearchInput()}
        </div>
    )
}

export default FiltersGroup
