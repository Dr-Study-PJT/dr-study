//package com.nomz.doctorstudy.studygroup.controller;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.nomz.doctorstudy.common.dto.ErrorResponse;
//import com.nomz.doctorstudy.common.dto.SuccessResponse;
//import com.nomz.doctorstudy.common.jwt.JwtUtil;
//import com.nomz.doctorstudy.config.WebMvcConfig;
//import com.nomz.doctorstudy.studygroup.entity.MemberStudyGroupApply;
//import com.nomz.doctorstudy.studygroup.entity.StudyGroup;
//import com.nomz.doctorstudy.studygroup.entity.StudyGroupTag;
//import com.nomz.doctorstudy.studygroup.entity.Tag;
//import com.nomz.doctorstudy.studygroup.request.CreateApplyRequest;
//import com.nomz.doctorstudy.studygroup.request.CreateStudyGroupRequest;
//import com.nomz.doctorstudy.studygroup.request.GetStudyGroupListRequest;
//import com.nomz.doctorstudy.studygroup.response.CreateApplyResponse;
//import com.nomz.doctorstudy.studygroup.response.CreateStudyGroupResponse;
//import com.nomz.doctorstudy.studygroup.response.GetStudyGroupListResponse;
//import com.nomz.doctorstudy.studygroup.response.GetStudyGroupResponse;
//import com.nomz.doctorstudy.studygroup.service.StudyGroupService;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.context.TestConfiguration;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.context.annotation.Bean;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
//import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
//
//import java.time.LocalDateTime;
//import java.util.Collections;
//import java.util.HashSet;
//import java.util.List;
//import java.util.Set;
//
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.ArgumentMatchers.anyLong;
//import static org.mockito.Mockito.when;
//
//
//
//@SpringBootTest
//@AutoConfigureMockMvc
//public class StudyGroupControllerTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @MockBean
//    private StudyGroupService studyGroupService;
//
//    @Autowired
//    private ObjectMapper objectMapper;
//
//    @BeforeEach
//    void setUp() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//    @Test
//    void testCreateStudyGroup() throws Exception {
//        CreateStudyGroupRequest request = new CreateStudyGroupRequest(
//                "정보처리기사 스터디",11L, "정보처리기사 합격을 위한 스터디입니다.",
//                LocalDateTime.now(), 6, List.of("토익", "정처기")
//        );
//
//        StudyGroup studyGroup = new StudyGroup();
//        // Set studyGroup fields here
//
//        when(studyGroupService.createStudyGroup(any(CreateStudyGroupRequest.class)))
//                .thenReturn(studyGroup);
//
//        mockMvc.perform(MockMvcRequestBuilders.post("/v1/groups")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(request)))
//                .andExpect(MockMvcResultMatchers.status().isOk())
//                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("StudyGroup 생성에 성공했습니다."));
//    }
//
//    @Test
//    void testGetStudyGroup() throws Exception {
//        Long groupId = 1L;
//        StudyGroup studyGroup = new StudyGroup();
//
//        // Set studyGroup fields here
//        studyGroup.setId(groupId);
//        studyGroup.setName("정보처리기사 스터디");
//        studyGroup.setImageId(11L);
//        studyGroup.setDescription("정보처리기사 합격을 위한 스터디입니다.");
//        studyGroup.setCreatedAt(LocalDateTime.now());
//        studyGroup.setIsDeleted(false);
//        studyGroup.setMemberCount(5);
//        studyGroup.setMemberCapacity(10);
//
//        // Create Tags
//        Tag tag1 = new Tag(1L, "토익");
//        Tag tag2 = new Tag(2L, "정처기");
//
//        // Create StudyGroupTags
//        StudyGroupTag studyGroupTag1 = new StudyGroupTag(tag1, studyGroup);
//
//        StudyGroupTag studyGroupTag2 = new StudyGroupTag(tag2, studyGroup);
//
//
//        // Set StudyGroupTags to StudyGroup
//        Set<StudyGroupTag> studyGroupTags = new HashSet<>();
//        studyGroupTags.add(studyGroupTag1);
//        studyGroupTags.add(studyGroupTag2);
//        studyGroup.setStudyGroupTags(studyGroupTags);
//
//        when(studyGroupService.getStudyGroup(anyLong()))
//                .thenReturn(studyGroup);
//
//        mockMvc.perform(MockMvcRequestBuilders.get("/v1/groups/{groupId}", groupId))
//                .andExpect(MockMvcResultMatchers.status().isOk())
//                .andDo(MockMvcResultHandlers.print());  // Log the response
//    }

//        @Test
//    void testCreateApply() throws Exception {
//        CreateApplyRequest request = new CreateApplyRequest(1L, 1L, "열심히 활동하겠습니다!");
//        CreateApplyResponse response = new CreateApplyResponse(1L);
//
//        // Mocking the creation of the apply
//        MemberStudyGroupApply mockApply = new MemberStudyGroupApply();
//        mockApply.setId(1L);
//
//        when(studyGroupService.createApply(any(CreateApplyRequest.class)))
//                .thenReturn(new MemberStudyGroupApply());
//
//        mockMvc.perform(MockMvcRequestBuilders.post("/v1/groups/admission/apply")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(request)))
//                .andExpect(MockMvcResultMatchers.status().isOk())
//                .andDo(MockMvcResultHandlers.print());
//        }

//
//
//    @Test
//    void testGetStudyGroupList() throws Exception {
//        GetStudyGroupListRequest request = new GetStudyGroupListRequest();
//        // Set request fields here
//
//        when(studyGroupService.getStudyGroupList(any(GetStudyGroupListRequest.class)))
//                .thenReturn(Collections.emptyList());
//
//        mockMvc.perform(MockMvcRequestBuilders.get("/v1/groups")
//                        .param("name", request.getName())
//                        .param("memberCapacity", String.valueOf(request.getMemberCapacity()))
//                        .param("tagName", request.getTagName()))
//                .andExpect(MockMvcResultMatchers.status().isOk())
//                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("StudyGroup 리스트 조회에 성공했습니다."));
//    }
//

//
//    @Test
//    void testGetApply() throws Exception {
//        Long userId = 1L;
//        Long groupId = 1L;
//        MemberStudyGroupApply apply = new MemberStudyGroupApply();
//        // Set apply fields here
//
//        when(studyGroupService.getApply(anyLong(), anyLong()))
//                .thenReturn(apply);
//
//        mockMvc.perform(MockMvcRequestBuilders.get("/v1/groups/admission")
//                        .param("user_id", String.valueOf(userId))
//                        .param("group_id", String.valueOf(groupId)))
//                .andExpect(MockMvcResultMatchers.status().isOk())
//                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Apply 조회에 성공했습니다."));
//    }
//   @Test
//    void testCreateReply() throws Exception {
//        CreateReplyRequest request = new CreateReplyRequest();
//        // Set request fields here
//
//        MemberStudyGroupApply apply = new MemberStudyGroupApply();
//        // Set apply fields here
//
//        when(studyGroupService.processReply(any(CreateReplyRequest.class)))
//                .thenReturn(apply);
//
//        mockMvc.perform(MockMvcRequestBuilders.post("/v1/groups/admission/reply")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(request)))
//                .andExpect(MockMvcResultMatchers.status().isOk())
//                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("성공적으로 그룹 가입 신청을 처리하였습니다."));
//    }
//}