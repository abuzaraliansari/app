import React, { useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext';
import AppStyles from '../styles/AppStyles';
import { FormDataContext } from '../contexts/FormDataContext';

const OwnerDetailsScreen = () => {
  const { formData } = useContext(FormDataContext);
  const { authState } = useContext(AuthContext);
  const CreatedBy = authState.user;
  const navigation = useNavigation();
  const route = useRoute();
  const source = route.params?.source;

  const handleNext = () => {
    if (source === 'Home' || source === 'edite') {
      navigation.navigate('PropertyArea', { source: 'Home' });
    } else if (source === 'AllDetails') {
      navigation.navigate('AllDetails');
    }
  };

  return (
    <ScrollView style={AppStyles.displayContainer}>
      <View style={AppStyles.displayContent}>
        <Text style={AppStyles.displayHeader}>Check Family Details</Text>
        {/* Family Members Section */}
        <View style={AppStyles.displaySection}>
          <Text style={AppStyles.displaySectionHeader}>Family Members</Text>
          <View style={AppStyles.displayTable}>
            {formData.familyMembers && formData.familyMembers.length > 0 ? (
              formData.familyMembers.map((member, index) => (
                <View key={index} style={AppStyles.displayTenantContainer}>
                  <Text style={AppStyles.displayLabel}>Family Member {index + 1}</Text>
                  <View style={AppStyles.displayRow}>
                    <Text style={AppStyles.displayCellHeader}>First Name</Text>
                    <Text style={AppStyles.displayCell}>{member.FirstName || 'N/A'}</Text>
                  </View>
                  <View style={AppStyles.displayRow}>
                    <Text style={AppStyles.displayCellHeader}>Last Name</Text>
                    <Text style={AppStyles.displayCell}>{member.LastName || 'N/A'}</Text>
                  </View>
                  <View style={AppStyles.displayRow}>
                    <Text style={AppStyles.displayCellHeader}>Age</Text>
                    <Text style={AppStyles.displayCell}>{member.age || 'N/A'}</Text>
                  </View>
                  <View style={AppStyles.displayRow}>
                    <Text style={AppStyles.displayCellHeader}>DOB</Text>
                    <Text style={AppStyles.displayCell}>{member.DOB || 'N/A'}</Text>
                  </View>
                  <View style={AppStyles.displayRow}>
                    <Text style={AppStyles.displayCellHeader}>Gender</Text>
                    <Text style={AppStyles.displayCell}>{member.gender || 'N/A'}</Text>
                  </View>
                  <View style={AppStyles.displayRow}>
                    <Text style={AppStyles.displayCellHeader}>Occupation</Text>
                    <Text style={AppStyles.displayCell}>{member.occupation || 'N/A'}</Text>
                  </View>
                  <View style={AppStyles.displayRow}>
                    <Text style={AppStyles.displayCellHeader}>Income</Text>
                    <Text style={AppStyles.displayCell}>{member.Income || 'N/A'}</Text>
                  </View>
                  <View style={AppStyles.displayRow}>
                    <Text style={AppStyles.displayCellHeader}>Relation</Text>
                    <Text style={AppStyles.displayCell}>{member.Relation || 'N/A'}</Text>
                  </View>
                  <View style={AppStyles.displayRow}>
                    <Text style={AppStyles.displayCellHeader}>Created By</Text>
                    <Text style={AppStyles.displayCell}>{CreatedBy || 'N/A'}</Text>
                  </View>
                  <TouchableOpacity
                    style={AppStyles.button}
                    onPress={() =>
                      navigation.navigate('Family', { source: 'edite', index })
                    }>
                    <Text style={AppStyles.buttonText}>Edit Family Member</Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text style={AppStyles.displayNoDataText}>No family members available</Text>
            )}
          </View>
        </View>
        <TouchableOpacity
          style={AppStyles.button}
          onPress={handleNext}>
          <Text style={AppStyles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default OwnerDetailsScreen;