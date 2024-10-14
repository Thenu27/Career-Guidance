import './user-infor.styles.css';

const UserInformation = ()=>{
    return(
        <div className='dropdown-container'> 
            <label class="dropdown">

                <div class="dd-button">
                         Dropdown
                </div>

                <input type="checkbox" class="dd-input" id="test"/>

                <ul class="dd-menu">
                    <li>Action</li>
                    <li>Another action</li>
                    <li>Something else here</li>
                
                </ul>

             </label>      

             <label class="dropdown">

                        <div class="dd-button">
                                Age   
                        </div>

                        <input type="checkbox" class="dd-input" id="test"/>

                        <ul class="dd-menu">
                            <li>Action</li>
                            <li>Another action</li>
                            <li>Something else here</li>
                        
                        </ul>

              </label>     

              <label class="dropdown">

                        <div class="dd-button">
                                Current Education  
                        </div>

                        <input type="checkbox" class="dd-input" id="test"/>

                        <ul class="dd-menu">
                            <li>Action</li>
                            <li>Another action</li>
                            <li>Something else here</li>
                        
                        </ul>

              </label>                       

        </div>
    )
}

export default UserInformation;