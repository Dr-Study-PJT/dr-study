package com.nomz.doctorstudy.studygroup.service;

import com.nomz.doctorstudy.studygroup.StudyGroup;
import com.nomz.doctorstudy.studygroup.request.AdmissionRequest;
import com.nomz.doctorstudy.studygroup.request.AdmissionResponseRequest;
import com.nomz.doctorstudy.studygroup.response.AdmissionResponse;

import java.util.List;

public interface StudyGroupService {
    // Create a new study group
    StudyGroup createStudyGroup(StudyGroup studyGroup);

    // Update an existing study group
    StudyGroup updateStudyGroup(Long groupId, StudyGroup studyGroupDetails);

    // Retrieve a specific study group by its ID
    StudyGroup getStudyGroup(Long groupId);

    // Retrieve all study groups
    List<StudyGroup> getAllStudyGroups();

    // Delete a study group by its ID
    void deleteStudyGroup(Long groupId);

    // Apply for a study group
    void applyForStudyGroup(AdmissionRequest admissionRequest);

    // Respond to a study group application
    void respondToStudyGroupApplication(AdmissionResponseRequest admissionResponseRequest);

    // Retrieve all study group applications
    List<AdmissionResponse> getAllStudyGroupApplications();
}
