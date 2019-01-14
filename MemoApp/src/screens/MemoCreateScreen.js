import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import firebase from 'firebase';

import CircleButton from '../elements/CircleButton';

class MemoCreateScreen extends React.Component{
    state={
        body: '',
    }

    handlePress(){
        const db = firebase.firestore();
        const { currentUser } = firebase.auth();

        db.settings({ timestampsInSnapshots: true });
        db.collection(`users/${currentUser.uid}/memos`).add({
            body:this.state.body,
            created_on: new Date(),
        })
        .then(() => {
            this.props.navigation.goBack();
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render(){
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.memoEditInput}
                    multiline
                    value={this.state.body}
                    onChangeText={(text) => { this.setState({ body:text }); }}
                />
                <CircleButton name="check" onPress={this.handlePress.bind(this)} style={styles.checkButton} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%',
    },
    memoEditInput:{
        backgroundColor: '#fff',
        flex: 1,
        paddingTop: 32,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,

    },
    checkButton:{
        top: 75,
    },

});


export default MemoCreateScreen;
