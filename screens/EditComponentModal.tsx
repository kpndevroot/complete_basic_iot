// EditComponentModal.tsx
import React, {useEffect, useState} from 'react';
import {Modal, View, TextInput, Button, StyleSheet} from 'react-native';
import useRoomStore from '../store/RoomOneStore';
interface EditComponentModalProps {
  visible: boolean;
  onClose: () => void;
  component: {name: string; type: string; N: number};
  onSave: (name: string, type: string, N: number) => void;
}

const EditComponentModal: React.FC<EditComponentModalProps> = ({
  visible,
  onClose,
  component,
  onSave,
}) => {
  const [editedName, setEditedName] = useState('');
  const [editedType, setEditedType] = useState('');
  useEffect(() => {
    setEditedName(component.name);
    setEditedType(component.type);
  }, [component]);

  const {editComponent}: any = useRoomStore();
  console.log({component: component});
  const handleSave = () => {
    onSave(editedName, editedType, component.N);
    onClose();
  };

  return (
    <Modal visible={visible} onRequestClose={onClose} animationType="slide">
      <View style={styles.modalContent}>
        <TextInput
          style={styles.input}
          value={editedName}
          onChangeText={setEditedName}
          placeholder="Component Name"
        />
        <TextInput
          style={styles.input}
          value={editedType}
          onChangeText={setEditedType}
          placeholder="Component Type"
        />
        <Button title="Save" onPress={handleSave} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
});

export default EditComponentModal;
