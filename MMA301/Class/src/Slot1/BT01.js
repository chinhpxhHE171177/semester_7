import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function BT01() {
    const [clickCount, setClickCount] = useState(0);

    const handlePress = () => {
        setClickCount(clickCount + 1);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>Vừa click lần {clickCount + 1}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 10,
        elevation: 3,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});


// import React, { useState } from 'react';
// import { Text, View, TouchableOpacity } from 'react-native';
// import styles from './BT01Styles';

// export default function BT01() {
//     const [clickCount, setClickCount] = useState(0);

//     const handlePress = () => {
//         setClickCount(clickCount + 1);
//     };

//     return (
//         <View style={styles.container}>
//             <TouchableOpacity style={styles.button} onPress={handlePress}>
//                 <Text style={styles.buttonText}>Vừa click lần {clickCount + 1}</Text>
//             </TouchableOpacity>
//         </View>
//     );
// }
