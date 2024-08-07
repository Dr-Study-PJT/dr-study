
--IMAGE--
INSERT INTO image (image_url, is_deleted, created_at)
VALUES ("https://mz-stop.s3.ap-northeast-2.amazonaws.com/dog.jpg", false, NOW())
;

--MEMBER-- password -> 'test'
INSERT INTO member (email, password, nickname, image_id, reg_date, leaved_date, is_leaved)
VALUES ('test1@example.com', '$2a$10$j74cGWgZfsNP2DMvG6SH6.vydHQhm8vkP5ukIRngOEETV.C9kWGy6', 'Im YH', 1, NOW(), null, false),
       ('test2@example.com', '$2a$10$j74cGWgZfsNP2DMvG6SH6.vydHQhm8vkP5ukIRngOEETV.C9kWGy6', 'SW', 1, NOW(), null, false),
       ('test3@example.com', '$2a$10$j74cGWgZfsNP2DMvG6SH6.vydHQhm8vkP5ukIRngOEETV.C9kWGy6', 'Im CH', 1, NOW(), null, false),
       ('test4@example.com', '$2a$10$j74cGWgZfsNP2DMvG6SH6.vydHQhm8vkP5ukIRngOEETV.C9kWGy6', 'KJH', 1, NOW(), null, false),
       ('test5@example.com', '$2a$10$j74cGWgZfsNP2DMvG6SH6.vydHQhm8vkP5ukIRngOEETV.C9kWGy6', 'KM', 1, NOW(), null, false),
       ('test6@example.com', '$2a$10$j74cGWgZfsNP2DMvG6SH6.vydHQhm8vkP5ukIRngOEETV.C9kWGy6', 'SJM', 1, NOW(), null, false)
;

--STUDY_GROUP--
INSERT INTO study_group (captain_id, image_id, name, description, goal, due_date, member_capacity, created_at, is_deleted)
VALUES (1, 1, "StudyGroup1", "StudyGroup1 Description", "StudyGroup1 Goal", DATE_ADD(NOW(), INTERVAL 7 DAY), 25, NOW(), false),
       (2, 1, "StudyGroup2", "StudyGroup2 Description", "StudyGroup2 Goal", DATE_ADD(NOW(), INTERVAL 14 DAY), 50, NOW(), false),
       (3, 1, "StudyGroup3", "StudyGroup3 Description", "StudyGroup3 Goal", DATE_ADD(NOW(), INTERVAL 30 DAY), 50, NOW(), false)
;

--MEMBER STUDY GROUP--
INSERT INTO member_study_group (member_id, study_group_id, role, join_date, is_leaved)
VALUES (1, 1, 'ADMIN', NOW(), false),
       (2, 1, 'USER', NOW(), false),
       (3, 1, 'USER', NOW(), false),
       (4, 2, 'ADMIN', NOW(), false),
       (5, 2, 'USER', NOW(), false),
       (6, 3, 'ADMIN', NOW(), false)
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
VALUES (1, "Simply print block logs.", "PrePrompt 1.",
        "
                phase(1) {
                    log(string_concat('hello ', 'world! ', '반갑습니다 ', '여러분들!'));
                    log('hi');
                    log(int_to_string(get_int_variable('current_phase')));
                }
",
        NOW()),
       (2, "Print logs while going through nested loops.", "PrePrompt 2.",
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
       (3, "Let Avatar Speak", "PrePrompt 3.",
        "
                phase(1) {
                    loop(3) {
                        let_avatar_speak('안녕하세요, 3번 프로세서 스크립트 실행 중입니다. 이 음성은 STT 기술을 이용해 만들어졌습니다. 안녕히계세요.');
                    }
                }
",
        NOW())
;

--MODERATOR--
INSERT INTO moderator (creator_id, avatar_id, processor_id, name, created_at)
VALUES (1, 1, 1, 'First Moderator', NOW()),
       (1, 2, 2, 'Second Moderator', NOW()),
       (2, 3, 1, 'Third Moderator', NOW()),
       (3, 4, 2, 'Fourth Moderator', NOW())
;

--CONFERENCE--
INSERT INTO conference (host_id, study_group_id, moderator_id, image_id, title, subject, member_capacity, start_time, finish_time, ai_review)
VALUES (1, 1, 1, 1, 'Conference 1 Title', 'Conference 1 Subject', 10, DATE_ADD(NOW(), INTERVAL -30 MINUTE), DATE_ADD(NOW(), INTERVAL 30 MINUTE), "Conference 1 Review!"),
       (1, 1, 2, 1, 'Conference 2 Title', 'Conference 2 Subject', 10, DATE_ADD(NOW(), INTERVAL -1 HOUR), DATE_ADD(NOW(), INTERVAL 1 HOUR), "Conference 2 Review!"),
       (2, 2, 1, 1, 'Conference 3 Title', 'Conference 3 Subject', 10, DATE_ADD(NOW(), INTERVAL -2 HOUR), DATE_ADD(NOW(), INTERVAL 2 HOUR), "Conference 3 Review!"),
       (2, 2, 2, 1, 'Conference 4 Title', 'Conference 4 Subject', 10, DATE_ADD(NOW(), INTERVAL -4 HOUR), DATE_ADD(NOW(), INTERVAL 4 HOUR), "Conference 4 Review!")
;