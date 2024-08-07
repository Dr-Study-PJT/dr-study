
--IMAGE--
INSERT INTO image (image_url, is_deleted, created_at)
VALUES ("https://mz-stop.s3.ap-northeast-2.amazonaws.com/dog.jpg", false, NOW())
;

--MEMBER-- password -> 'test'
INSERT INTO member (email, password, nickname, image_id, reg_date, leaved_date, is_leaved)
VALUES ('test1@example.com', '$2a$10$j74cGWgZfsNP2DMvG6SH6.vydHQhm8vkP5ukIRngOEETV.C9kWGy6', '유영한이다', 1, NOW(), null, false),
       ('test2@example.com', '$2a$10$j74cGWgZfsNP2DMvG6SH6.vydHQhm8vkP5ukIRngOEETV.C9kWGy6', '어 나 성운데', 1, NOW(), null, false),
       ('test3@example.com', '$2a$10$j74cGWgZfsNP2DMvG6SH6.vydHQhm8vkP5ukIRngOEETV.C9kWGy6', 'Im 철현', 1, NOW(), null, false),
       ('test4@example.com', '$2a$10$j74cGWgZfsNP2DMvG6SH6.vydHQhm8vkP5ukIRngOEETV.C9kWGy6', '김주현인데요', 1, NOW(), null, false),
       ('test5@example.com', '$2a$10$j74cGWgZfsNP2DMvG6SH6.vydHQhm8vkP5ukIRngOEETV.C9kWGy6', '갱모', 1, NOW(), null, false),
       ('test6@example.com', '$2a$10$j74cGWgZfsNP2DMvG6SH6.vydHQhm8vkP5ukIRngOEETV.C9kWGy6', '신재민이에요', 1, NOW(), null, false)
;

--STUDY_GROUP--
INSERT INTO study_group (captain_id, image_id, name, description, goal, due_date, member_capacity, created_at, is_deleted)
VALUES (1, 1, "스터디그룹1", "스터디그룹1 설명", "스터디그룹1 목표", DATE_ADD(NOW(), INTERVAL 7 DAY), 25, NOW(), false),
       (2, 1, "스터디그룹2", "스터디그룹2 설명", "스터디그룹2 목표", DATE_ADD(NOW(), INTERVAL 14 DAY), 50, NOW(), false),
       (3, 1, "스터디그룹3", "스터디그룹3 설명", "스터디그룹3 목표", DATE_ADD(NOW(), INTERVAL 30 DAY), 50, NOW(), false)
;

--MEMBER STUDY GROUP--
INSERT INTO member_study_group (member_id, study_group_id, role, join_date, is_leaved)
VALUES (1, 1, 'CAPTAIN', NOW(), false),
       (2, 1, 'MEMBER', NOW(), false),
       (3, 1, 'MEMBER', NOW(), false),
       (4, 2, 'CAPTAIN', NOW(), false),
       (5, 2, 'MEMBER', NOW(), false),
       (6, 3, 'CAPTAIN', NOW(), false)
;

--Tag--
INSERT INTO tag (id, name)
VALUES (1, 'tag1'),
       (2, 'tag2'),
       (3, 'tag3'),
       (4, 'tag4'),
       (5, 'tag5')
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
       (5, 1)
;

--MEMBER STUDY GROUP APPLY--
INSERT INTO member_study_group_apply (member_id, study_group_id, status, created_at, message)
VALUES (1, 3, 'WAITING', NOW(), '스터디그룹 가입신청합니다~! 1'),
       (1, 2, 'WAITING', NOW(), '스터디그룹 가입신청합니다~! 2'),
       (2, 1, 'WAITING', NOW(), '스터디그룹 가입신청합니다~! 3'),
       (3, 1, 'WAITING', NOW(), '스터디그룹 가입신청합니다~! 4'),
       (4, 1, 'WAITING', NOW(), '스터디그룹 가입신청합니다~! 5'),
       (5, 1, 'WAITING', NOW(), '스터디그룹 가입신청합니다~! 6'),
       (6, 1, 'WAITING', NOW(), '스터디그룹 가입신청합니다~! 6')
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
                    loop(3) {
                        let_avatar_speak('안녕하세요, 3번 프로세서 스크립트 실행 중입니다. 이 음성은 STT 기술을 이용해 만들어졌습니다. 안녕히계세요.');
                    }
                }
",
        NOW())
;

--MODERATOR--
INSERT INTO moderator (creator_id, avatar_id, processor_id, name, created_at)
VALUES (1, 1, 1, '1번 사회자', NOW()),
       (1, 2, 2, '2번 사회자', NOW()),
       (2, 3, 1, '3번 사회자', NOW()),
       (3, 4, 2, '4번 사회자', NOW())
;

--CONFERENCE--
INSERT INTO conference (host_id, study_group_id, moderator_id, image_id, title, subject, member_capacity, start_time, finish_time, ai_review)
VALUES (1, 1, 1, 1, '컨퍼런스 1 제목', '컨퍼런스 1 주제', 10, null, null, "컨퍼런스 1 리뷰!"),
       (1, 1, 2, 1, '컨퍼런스 2 제목', '컨퍼런스 2 주제', 10, null, null, "컨퍼런스 2 리뷰!"),
       (2, 2, 1, 1, '컨퍼런스 3 제목', '컨퍼런스 3 주제', 10, null, null, "컨퍼런스 3 리뷰!"),
       (2, 2, 2, 1, '컨퍼런스 4 제목', '컨퍼런스 4 주제', 10, null, null, "컨퍼런스 4 리뷰!")
;

--CONFERENCE_MEMBER_INVITE--
INSERT INTO conference_member_invite (conference_id, member_id, created_at)
VALUES (2, 1, DATE_ADD(NOW(), INTERVAL -2 HOUR)),
       (3, 1, DATE_ADD(NOW(), INTERVAL -50 MINUTE)),
       (1, 2, DATE_ADD(NOW(), INTERVAL -40 MINUTE)),
       (1, 3, DATE_ADD(NOW(), INTERVAL -30 MINUTE))
;

--ARTICLES--
INSERT INTO article (id, title, content, created_at, is_deleted, view_count, member_id, study_group_id)
VALUES (1, '게시글 제목 1', '게시글 내용 1', NOW(), FALSE, 0, 1, 1),
       (2, '게시글 제목 2', '게시글 내용 2', NOW(), FALSE, 0, 2, 1),
       (3, '게시글 제목 3', '게시글 내용 3', NOW(), FALSE, 0, 3, 2),
       (4, '게시글 제목 4', '게시글 내용 4', NOW(), FALSE, 0, 4, 2),
       (5, '게시글 제목 5', '게시글 내용 5', NOW(), FALSE, 0, 5, 3)
;

--COMMENTS--
INSERT INTO comment (content, created_at, article_id, member_id)
VALUES ('댓글 내용 1', NOW(), 1, 1),
       ('댓글 내용 2', NOW(), 1, 2),
       ('댓글 내용 3', NOW(), 2, 3),
       ('댓글 내용 4', NOW(), 3, 4),
       ('댓글 내용 5', NOW(), 4, 5);

--ARTICLE_TAGS--
INSERT INTO article_tag (article_id, tag_id)
VALUES (1, 1),
       (1, 2),
       (2, 1),
       (3, 3),
       (4, 4),
       (5, 5);