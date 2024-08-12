
--IMAGE--
INSERT INTO image (image_url, is_deleted, created_at)
VALUES ("https://mz-stop.s3.ap-northeast-2.amazonaws.com/dog.jpg", false, NOW()),
       ("https://s3.ap-northeast-2.amazonaws.com/mz-stop/dr-study/images/members/2907ae0a-7236-49f2-a8cf-c6415e8789be.png", false, NOW()),
       ("https://s3.ap-northeast-2.amazonaws.com/mz-stop/dr-study/images/groups/67e7d2ee-b291-45a7-8755-c9c53ae6de8f.png", false, NOW())
;

--MEMBER-- password -> 'test'
INSERT INTO member (email, password, nickname, image_id, reg_date, leaved_date, is_leaved)
VALUES ('test1@example.com', '$2a$10$j74cGWgZfsNP2DMvG6SH6.vydHQhm8vkP5ukIRngOEETV.C9kWGy6', '유영한이다', 1, NOW(), null, false),
       ('test2@example.com', '$2a$10$j74cGWgZfsNP2DMvG6SH6.vydHQhm8vkP5ukIRngOEETV.C9kWGy6', '어 나 성운데', 1, NOW(), null, false),
       ('test3@example.com', '$2a$10$j74cGWgZfsNP2DMvG6SH6.vydHQhm8vkP5ukIRngOEETV.C9kWGy6', 'Im 철현', 1, NOW(), null, false),
       ('test4@example.com', '$2a$10$j74cGWgZfsNP2DMvG6SH6.vydHQhm8vkP5ukIRngOEETV.C9kWGy6', '김주현인데요', 1, NOW(), null, false),
       ('test5@example.com', '$2a$10$j74cGWgZfsNP2DMvG6SH6.vydHQhm8vkP5ukIRngOEETV.C9kWGy6', '갱모', 1, NOW(), null, false),
       ('test6@example.com', '$2a$10$j74cGWgZfsNP2DMvG6SH6.vydHQhm8vkP5ukIRngOEETV.C9kWGy6', '신재민이에요', 1, NOW(), null, false),
       ('tester@example.com', '$2a$10$3OP12OuyAPl8iDzQeSjqYOhTLTYxb23Bje1lW7.cX3OZv5nldYHzm', '테스터님', 2, NOW(), null, false)
;

--STUDY_GROUP--
INSERT INTO study_group (captain_id, image_id, name, description, goal, due_date, member_capacity, created_at, is_deleted)
VALUES (1, 1, "스터디그룹1", "스터디그룹1 설명", "스터디그룹1 목표", DATE_ADD(NOW(), INTERVAL 7 DAY), 25, NOW(), false),
       (2, 1, "스터디그룹2", "스터디그룹2 설명", "스터디그룹2 목표", DATE_ADD(NOW(), INTERVAL 14 DAY), 50, NOW(), false),
       (3, 1, "스터디그룹3", "스터디그룹3 설명", "스터디그룹3 목표", DATE_ADD(NOW(), INTERVAL 30 DAY), 50, NOW(), false),
       (7, 3, "CS 전공 면접 스터디", "CS 전공면접에 대비하여 각자 공부한 내용을 면접식으로 주고받는 것에 목적을 둔 스터디입니다. 밝은 분위기에서 함께 준비해요!",
       "면접 합격!", DATE_ADD(NOW(), INTERVAL 100 DAY), 6, DATE_ADD(NOW(), INTERVAL -30 DAY), false)
;

--MEMBER STUDY GROUP--
INSERT INTO member_study_group (member_id, study_group_id, role, join_date, is_leaved)
VALUES (1, 1, 'CAPTAIN', DATE_ADD(NOW(), INTERVAL 7 DAY), false),
       (2, 2, 'CAPTAIN', DATE_ADD(NOW(), INTERVAL 7 DAY), false),
       (2, 1, 'MEMBER', DATE_ADD(NOW(), INTERVAL 7 DAY), false),
       (3, 3, 'CAPTAIN', DATE_ADD(NOW(), INTERVAL 7 DAY), false),
       (5, 1, 'MEMBER', DATE_ADD(NOW(), INTERVAL -1 HOUR), false),
       (7, 4, 'CAPTAIN', DATE_ADD(NOW(), INTERVAL -30 DAY), false),
       (1, 4, 'MEMBER', DATE_ADD(NOW(), INTERVAL -20 DAY), false),
       (2, 4, 'MEMBER', DATE_ADD(NOW(), INTERVAL -10 DAY), false),
       (7, 1, 'MEMBER', DATE_ADD(NOW(), INTERVAL -1 HOUR), false),
       (7, 2, 'MEMBER', DATE_ADD(NOW(), INTERVAL -1 HOUR), false)
;

--Tag--
INSERT INTO tag (id, name)
VALUES (1, '태그1'),
       (2, '태그2'),
       (3, '태그3'),
       (4, '태그4'),
       (5, '태그5'),
       (6, '컴퓨터공학'),
       (7, '전공면접')

;

--STUDY GROUP TAG--
INSERT INTO study_group_tag (tag_id, study_group_id)
VALUES (1, 1),
       (2, 2),
       (3, 3),
       (1, 1),
       (2, 1),
       (3, 1),
       (4, 1),
       (5, 1),
       (6, 4),
       (7, 4)
;

--MEMBER STUDY GROUP APPLY--
INSERT INTO member_study_group_apply (applicant_id, study_group_id, status, created_at, apply_message)
VALUES (1, 3, 'WAITING', DATE_ADD(NOW(), INTERVAL -10 MINUTE),  '스터디그룹 가입 신청 메시지 1'),
       (1, 2, 'WAITING', DATE_ADD(NOW(), INTERVAL -20 MINUTE),  '스터디그룹 가입 신청 메시지 2'),
       (3, 1, 'WAITING', DATE_ADD(NOW(), INTERVAL -40 MINUTE),  '스터디그룹 가입 신청 메시지 3'),
       (4, 1, 'DENIED', DATE_ADD(NOW(), INTERVAL -1 HOUR),      '스터디그룹 가입 신청 메시지 4'),
       (5, 1, 'APPROVED', DATE_ADD(NOW(), INTERVAL -2 HOUR),    '스터디그룹 가입 신청 메시지 5')
;

--AVATAR--
INSERT INTO avatar (creator_id, character_type, model_type, voice_type, created_at)
VALUES (1, 1, 3, 2, NOW()),
       (2, 2, 2, 3, NOW()),
       (3, 3, 1, 1, NOW()),
       (4, 1, 3, 3, NOW()),
       (5, 2, 2, 1, NOW()),
       (6, 3, 1, 2, NOW())
;

--PROCESSOR--
INSERT INTO processor (creator_id, description, pre_prompt, script, created_at)
VALUES (1, "간단하게 블록 로그 출력 수행", "1번 사전 프롬프트",
        "
                phase(1) {
                    log(string_concat('hello ', 'world! ', '반갑습니다 ', '여러분들!'));
                    log('hi');
                    log(int_to_string(get_int_variable('current_phase')));
                }
",
        NOW()),
       (2, "중첩 반복문 돌면서 로그 출력 수행", "2번 사전 프롬프트",
        "
                phase(1) {
                    loop(3) {
                        log(string_concat('outer_iter=', int_to_string(get_int_variable(get_string_variable('current_iterator')))));
                        loop(3) {
                            log(string_concat('inner_iter=', int_to_string(get_int_variable(get_string_variable('current_iterator')))));
                        }
                        log('--------------------');
                    }
                }
",
        NOW()),
       (3, "아바타 말하기 스크립트", "3번 사전 프롬프트",
        "
                phase(1) {
                    loop(1) {
                        let_avatar_speak(gpt_query('반갑워 GPT야. 너는 내가 얼마나 반가운지 약 30자 정도로 대답해봐'));
                        wait(1000);
                    }
                }
",
        NOW()),
       (1, "아바타 말하기 스크립트", "4번 사전 프롬프트",
        "
                phase(1) {
                    loop (1) {
                        let_avatar_speak('반갑습니다. 저는 현재 유영한과 신재민이 참여한 컨퍼런스의 사회자입니다. 제 목소리가 잘 들리십니까?');
                    }
                }
",
        NOW()),
       (1, "사용자 말하기 스크립트", "5번 사전 프롬프트",
        "
                phase(1) {
                    loop (1) {
                        let_participant_speak(1, 5000);
                        log(get_recent_participant_speak(1));
                        let_avatar_speak(get_recent_participant_speak(1));
                    }
                }
",
        NOW()),
       (1, "시연:올림픽 스크립트", "6번 사전 프롬프트",
        "
            phase(1) {
                let_avatar_speak(gpt_query('15초 분량으로 인사'));
                let_avatar_speak(gpt_query('1단계 안내하고 참여자들에게 발화 준비하라고 말하기'));
            }
            phase(2) {
                loop (get_num_of_participant()) {
                    let_participant_speak(get_num_of_iteration(), 30000);
                    let_avatar_speak(gpt_query(
                            string_concat(
                                get_recent_participant_speak(1),
                                gpt_query('약 10초 가량 피드백 후 다음 단계 안내')
                            )
                        )
                    );
                }
            }
",
        NOW())
;

--MODERATOR--
INSERT INTO moderator (creator_id, avatar_id, processor_id, name, created_at)
VALUES (1, 1, 1, '1번 사회자', NOW()),
       (2, 2, 2, '2번 사회자', NOW()),
       (1, 3, 3, '3번 사회자', NOW()),
       (2, 3, 4, '4번 사회자', NOW()),
       (1, 3, 5, '5번 사회자', NOW()),
       (1, 1, 6, '6번 사회자', NOW())
;

--CONFERENCE--
INSERT INTO conference (host_id, study_group_id, moderator_id, image_id, title, subject, member_capacity, start_time, finish_time, ai_review)
VALUES (1, 1, 1, 1, '컨퍼런스 1 제목', '컨퍼런스 1 주제', 10, null, null, "컨퍼런스 1 리뷰!"),
       (1, 1, 2, 1, '컨퍼런스 2 제목', '컨퍼런스 2 주제', 10, null, null, "컨퍼런스 2 리뷰!"),
       (2, 2, 1, 1, '컨퍼런스 3 제목', '컨퍼런스 3 주제', 10, null, null, "컨퍼런스 3 리뷰!"),
       (2, 2, 2, 1, '컨퍼런스 4 제목', '컨퍼런스 4 주제', 10, null, null, "컨퍼런스 4 리뷰!"),
       (1, 1, 2, 1, '컨퍼런스 5 제목', '컨퍼런스 5 주제', 10, DATE_ADD(NOW(), INTERVAL -3 HOUR), DATE_ADD(NOW(), INTERVAL -1 HOUR), "컨퍼런스 5 리뷰!"),
       (1, 1, 3, 1, '컨퍼런스 6 제목', '컨퍼런스 6 주제', 10, null, null, "컨퍼런스 6 리뷰!")
;

--CONFERENCE_MEMBER--
INSERT INTO conference_member (conference_id, member_id)
VALUES (5, 1),
       (5, 5)
;

--CONFERENCE_MEMBER_INVITE--
INSERT INTO conference_member_invite (conference_id, member_id, created_at)
VALUES (2, 1, DATE_ADD(NOW(), INTERVAL -2 HOUR)),
       (3, 1, DATE_ADD(NOW(), INTERVAL -50 MINUTE)),
       (1, 2, DATE_ADD(NOW(), INTERVAL -40 MINUTE)),
       (1, 3, DATE_ADD(NOW(), INTERVAL -30 MINUTE)),

       (6, 2, DATE_ADD(NOW(), INTERVAL -30 MINUTE)),
       (6, 3, DATE_ADD(NOW(), INTERVAL -30 MINUTE)),
       (6, 4, DATE_ADD(NOW(), INTERVAL -30 MINUTE)),
       (6, 5, DATE_ADD(NOW(), INTERVAL -30 MINUTE))
;


--ARTICLES--
INSERT INTO article (id, title, content, created_at, is_deleted, view_count, member_id, study_group_id)
VALUES (1, '게시글 제목 1', '게시글 내용 1', DATE_ADD(NOW(), INTERVAL -10 MINUTE), FALSE, 0, 1, 1),
       (2, '게시글 제목 2', '게시글 내용 2', DATE_ADD(NOW(), INTERVAL -20 MINUTE), FALSE, 0, 2, 1),
       (3, '게시글 제목 3', '게시글 내용 3', DATE_ADD(NOW(), INTERVAL -30 MINUTE), FALSE, 0, 3, 2),
       (4, '게시글 제목 4', '게시글 내용 4', DATE_ADD(NOW(), INTERVAL -40 MINUTE), FALSE, 0, 4, 2),
       (5, '게시글 제목 5', '게시글 내용 5', DATE_ADD(NOW(), INTERVAL -50 MINUTE), FALSE, 0, 5, 3)
;

--COMMENTS--
INSERT INTO comment (content, created_at, article_id, member_id, is_deleted)
VALUES ('댓글 내용 1', DATE_ADD(NOW(), INTERVAL -1 MINUTE), 1, 1, FALSE),
       ('댓글 내용 2', DATE_ADD(NOW(), INTERVAL -2 MINUTE), 1, 2, FALSE),
       ('댓글 내용 3', DATE_ADD(NOW(), INTERVAL -3 MINUTE), 2, 3, FALSE),
       ('댓글 내용 4', DATE_ADD(NOW(), INTERVAL -4 MINUTE), 3, 4, FALSE),
       ('댓글 내용 5', DATE_ADD(NOW(), INTERVAL -5 MINUTE), 4, 5, FALSE)
;

--ARTICLE_TAGS--
INSERT INTO article_tag (article_id, tag_id)
VALUES (1, 1),
       (1, 2),
       (2, 1),
       (3, 3),
       (4, 4),
       (5, 5)
;