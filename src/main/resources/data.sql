
--IMAGE--
INSERT INTO image (image_url, is_deleted, created_at)
VALUES ("https://mz-stop.s3.ap-northeast-2.amazonaws.com/dog.jpg", false, NOW())
;

--MEMBER--
INSERT INTO member (email, password, nickname, image_id, reg_date, leaved_date, is_leaved)
VALUES ('test1@example.com', 'test', '유영한이다', 1, NOW(), null, false),
       ('test2@example.com', 'test', '난 조성우', 1, NOW(), null, false),
       ('test2@example.com', 'test', 'Im 철현', 1, NOW(), null, false),
       ('test2@example.com', 'test', '김주현인데요', 1, NOW(), null, false),
       ('test2@example.com', 'test', '갱모', 1, NOW(), null, false),
       ('test2@example.com', 'test', '신재민이에요', 1, NOW(), null, false)
;

--STUDY_GROUP--
INSERT INTO study_group (captain_id, image_id, name, description, goal, due_date, member_count, member_capacity, created_at, is_deleted)
VALUES (1, 1, "스터디그룹1", "스터디그룹1 설명", "스터디그룹1 목표", DATE_ADD(NOW(), INTERVAL 7 DAY), 0, 25, NOW(), false),
       (2, 1, "스터디그룹2", "스터디그룹2 설명", "스터디그룹2 목표", DATE_ADD(NOW(), INTERVAL 14 DAY), 0, 50, NOW(), false)
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
                    log(string_concat(''hello '', ''world! '', ''반갑습니다 '', ''여러분들!''));
                    log(''hi'');
                    log(int_to_string(get_int_variable(''current_phase'')));
                }
",
        NOW()),
       (2, "중첩 반복문 돌면서 로그 출력 수행", "2번 사전 프롬프트",
        "
                phase(1) {
                    loop(3) {
                        log(string_concat(''outer_iter='', int_to_string(get_int_variable(get_string_variable(''current_iterator'')))));
                        loop(3) {
                            log(string_concat(''inner_iter='', int_to_string(get_int_variable(get_string_variable(''current_iterator'')))));
                        }
                        log(''--------------------'');
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
VALUES (1, 2, 2, 1, '컨퍼런스 1번 제목', '컨퍼런스 1번 주제', 10, DATE_ADD(NOW(), INTERVAL -30 MINUTE), DATE_ADD(NOW(), INTERVAL 30 MINUTE), "1번 컨퍼런스 리뷰"),
       (2, 2, 2, 1, '컨퍼런스 2번 제목', '컨퍼런스 2번 주제', 10, DATE_ADD(NOW(), INTERVAL -1 HOUR), DATE_ADD(NOW(), INTERVAL 1 HOUR), "2번 컨퍼런스 리뷰")
;