import React from 'react'

function HistoryPage(props) {

    return (
        <div style={{ width: '60%', margin: '3rem auto'}}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1 style={{fontFamily: 'Permanent Marker', color:'white', fontSize: '100px'}}>Shopping Cart</h1>
            </div>
            <br />

            <table>
                <thead>
                    <tr>
                        <th style={{color:'white'}}>Payment Id</th>
                        <th style={{color:'white'}}>Price</th>
                        <th style={{color:'white'}}>Quantity</th>
                        <th style={{color:'white'}}>Date of Purchase</th>
                    </tr>
                </thead>

                <tbody>

                    {props.user.userData && props.user.userData.history &&
                        props.user.userData.history.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>{item.dateOfPurchase}</td>
                            </tr>
                        ))}


                </tbody>
            </table>
        </div>
    )
}

export default HistoryPage
