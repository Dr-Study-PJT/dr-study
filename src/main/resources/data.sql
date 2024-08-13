
--IMAGE--
INSERT INTO image (image_url, is_deleted, created_at)
VALUES ("https://mz-stop.s3.ap-northeast-2.amazonaws.com/dog.jpg", false, NOW()),
       ("https://s3.ap-northeast-2.amazonaws.com/mz-stop/dr-study/images/members/2907ae0a-7236-49f2-a8cf-c6415e8789be.png", false, NOW()),
       ("https://s3.ap-northeast-2.amazonaws.com/mz-stop/dr-study/images/groups/67e7d2ee-b291-45a7-8755-c9c53ae6de8f.png", false, NOW()),
       ("https://mz-stop.s3.ap-northeast-2.amazonaws.com/dr-study/images/members/MemberA.jpg", false, NOW()),
       ("https://mz-stop.s3.ap-northeast-2.amazonaws.com/dr-study/images/members/MemberB.jpg", false, NOW()),
       ("https://mz-stop.s3.ap-northeast-2.amazonaws.com/dr-study/images/members/MemberC.png", false, NOW()),
       ("https://mz-stop.s3.ap-northeast-2.amazonaws.com/dr-study/images/members/MemberD.png", false, NOW()),
       ("https://mz-stop.s3.ap-northeast-2.amazonaws.com/dr-study/images/members/MemberE.png", false, NOW()),
       ("https://mz-stop.s3.ap-northeast-2.amazonaws.com/dr-study/images/members/MemberF.png", false, NOW()),
       ("https://mz-stop.s3.ap-northeast-2.amazonaws.com/dr-study/images/members/MemberG.png", false, NOW()),
       ("https://mz-stop.s3.ap-northeast-2.amazonaws.com/dr-study/images/members/MemberH.png", false, NOW()),
       ("https://mz-stop.s3.ap-northeast-2.amazonaws.com/dr-study/images/members/MemberI.png", false, NOW()),
       ("https://mz-stop.s3.ap-northeast-2.amazonaws.com/dr-study/images/members/MemberJ.jpg", false, NOW()),
       ("https://mz-stop.s3.ap-northeast-2.amazonaws.com/dr-study/images/members/MemberK.jpg", false, NOW()),
       ("https://mz-stop.s3.ap-northeast-2.amazonaws.com/dr-study/images/members/MemberL.jpg", false, NOW()),

       ("https://mz-stop.s3.ap-northeast-2.amazonaws.com/dr-study/images/groups/%EB%8F%85%EC%84%9C.png", false, NOW()), -- 독서
       ("https://mz-stop.s3.ap-northeast-2.amazonaws.com/dr-study/images/groups/%EC%9E%90%EA%B2%A9%EC%A6%9D.jpeg", false, NOW()), -- 자격증
       ("https://mz-stop.s3.ap-northeast-2.amazonaws.com/dr-study/images/groups/%EC%BD%94%EB%94%A9.png", false, NOW()), -- 코딩
       ("https://mz-stop.s3.ap-northeast-2.amazonaws.com/dr-study/images/groups/%ED%86%A0%EB%A1%A0.jpg", false, NOW()), -- 토론
       ("https://mz-stop.s3.ap-northeast-2.amazonaws.com/dr-study/images/groups/AI.jpg", false, NOW()), -- AI
       ("https://mz-stop.s3.ap-northeast-2.amazonaws.com/dr-study/images/groups/History.jpg", false, NOW()) -- 한국사

;

--MEMBER-- password -> 'test'
INSERT INTO member (email, password, nickname, image_id, reg_date, leaved_date, is_leaved)
VALUES ('tester@example.com', '$2a$10$3OP12OuyAPl8iDzQeSjqYOhTLTYxb23Bje1lW7.cX3OZv5nldYHzm', '테스터님', 2, NOW(), null, false),
       ('testera@example.com', '$2a$10$3OP12OuyAPl8iDzQeSjqYOhTLTYxb23Bje1lW7.cX3OZv5nldYHzm', '박경모', 4, NOW(), null, false),
       ('testerb@example.com', '$2a$10$3OP12OuyAPl8iDzQeSjqYOhTLTYxb23Bje1lW7.cX3OZv5nldYHzm', '장철현', 5, NOW(), null, false),
       ('testerc@example.com', '$2a$10$3OP12OuyAPl8iDzQeSjqYOhTLTYxb23Bje1lW7.cX3OZv5nldYHzm', '유영한', 11, NOW(), null, false),
       ('testerd@example.com', '$2a$10$3OP12OuyAPl8iDzQeSjqYOhTLTYxb23Bje1lW7.cX3OZv5nldYHzm', '조성우', 13, NOW(), null, false),
       ('testerk@example.com', '$2a$10$3OP12OuyAPl8iDzQeSjqYOhTLTYxb23Bje1lW7.cX3OZv5nldYHzm', '신재민', 14, NOW(), null, false),
       ('testerl@example.com', '$2a$10$3OP12OuyAPl8iDzQeSjqYOhTLTYxb23Bje1lW7.cX3OZv5nldYHzm', '김주현', 15, NOW(), null, false),
       ('testere@example.com', '$2a$10$3OP12OuyAPl8iDzQeSjqYOhTLTYxb23Bje1lW7.cX3OZv5nldYHzm', '서이준', 8, NOW(), null, false),
       ('testerf@example.com', '$2a$10$3OP12OuyAPl8iDzQeSjqYOhTLTYxb23Bje1lW7.cX3OZv5nldYHzm', '이현', 9, NOW(), null, false),
       ('testerg@example.com', '$2a$10$3OP12OuyAPl8iDzQeSjqYOhTLTYxb23Bje1lW7.cX3OZv5nldYHzm', '이준혁', 10, NOW(), null, false),
       ('testerh@example.com', '$2a$10$3OP12OuyAPl8iDzQeSjqYOhTLTYxb23Bje1lW7.cX3OZv5nldYHzm', '김태영', 7, NOW(), null, false),
       ('testeri@example.com', '$2a$10$3OP12OuyAPl8iDzQeSjqYOhTLTYxb23Bje1lW7.cX3OZv5nldYHzm', '박시후', 12, NOW(), null, false),
       ('testerj@example.com', '$2a$10$3OP12OuyAPl8iDzQeSjqYOhTLTYxb23Bje1lW7.cX3OZv5nldYHzm', '하도윤', 6, NOW(), null, false)
;

--STUDY_GROUP--
INSERT INTO study_group (captain_id, image_id, name, description, goal, due_date, member_capacity, created_at, is_deleted)
VALUES
(2, 3, "CS 전공 면접 스터디",
 "CS 전공면접에 대비하여 각자 공부한 내용을 면접식으로 주고받는 것에 목적을 둔 스터디입니다. 밝은 분위기에서 함께 준비해요!",
 "면접 합격!", DATE_ADD(NOW(), INTERVAL 100 DAY), 10, DATE_ADD(NOW(), INTERVAL -30 DAY), false),

(3, 14, "삼성 공채 준비 스터디",
 "삼성 공채를 목표로 하는 취준생들의 스터디입니다. 서로 정보 공유하며 함께 준비해요!",
 "삼성 공채 합격", DATE_ADD(NOW(), INTERVAL 90 DAY), 10, DATE_ADD(NOW(), INTERVAL -30 DAY), false),

(4, 14, "월간 독서 클럽",
 "매월 한 권의 책을 함께 읽고 토론하는 독서 모임입니다. 다양한 관점을 나누고 싶으신 분 환영합니다.",
 "연간 12권 독서", DATE_ADD(NOW(), INTERVAL 300 DAY), 15, DATE_ADD(NOW(), INTERVAL -365 DAY), false),

(5, 15, "자격증 취득 스터디",
 "다양한 자격증 취득을 목표로 한 스터디입니다. 함께 공부하며 목표 달성을 이루어냅시다!",
 "자격증 취득", DATE_ADD(NOW(), INTERVAL 30 DAY), 20, DATE_ADD(NOW(), INTERVAL -12 DAY), false),

(6, 16, "코딩 마스터 스터디",
 "코딩 실력을 향상시키기 위해 함께 프로젝트를 진행하고 알고리즘 문제를 풀어보는 스터디입니다.",
 "코딩 실력 향상", DATE_ADD(NOW(), INTERVAL 120 DAY), 8, DATE_ADD(NOW(), INTERVAL -54 DAY), false),

(7, 17, "심층 토론 스터디",
 "시사와 사회 이슈에 대해 깊이 있게 토론하는 스터디입니다. 논리적인 사고를 키우고 싶은 분들 환영합니다.",
 "논리적 사고력 향상", DATE_ADD(NOW(), INTERVAL 30 DAY), 12, DATE_ADD(NOW(), INTERVAL -10 DAY), false),

(8, 18, "AI 연구 스터디",
 "AI 기술을 연구하고 발전시키기 위한 스터디입니다. 최신 논문을 함께 분석하고, 프로젝트를 진행해요.",
 "AI 연구 프로젝트 완수", DATE_ADD(NOW(), INTERVAL 270 DAY), 5, DATE_ADD(NOW(), INTERVAL -20 DAY), false),

(5, 19, "한국사 1급 자격증 스터디",
 "한국사 1급 자격증 취득을 위한 학습공유 스터디입니다.",
 "한국사 1급 취득!", DATE_ADD(NOW(), INTERVAL 30 DAY), 10, DATE_ADD(NOW(), INTERVAL -10 DAY), false)
;

--MEMBER STUDY GROUP--
INSERT INTO member_study_group (member_id, study_group_id, role, join_date, is_leaved)
VALUES

-- CS 전공 면접 스터디
(2, 1, 'CAPTAIN', DATE_ADD(NOW(), INTERVAL -30 DAY), false),
(3, 1, 'MEMBER', DATE_ADD(NOW(), INTERVAL -20 DAY), false),
(4, 1, 'MEMBER', DATE_ADD(NOW(), INTERVAL -10 DAY), false),
(5, 1, 'MEMBER', DATE_ADD(NOW(), INTERVAL -15 DAY), false),
(6, 1, 'MEMBER', DATE_ADD(NOW(), INTERVAL -25 DAY), false),

-- 삼성 공채 준비 스터디
(3, 2, 'CAPTAIN', DATE_ADD(NOW(), INTERVAL -30 DAY), false),
(4, 2, 'MEMBER', DATE_ADD(NOW(), INTERVAL -40 DAY), false),
(5, 2, 'MEMBER', DATE_ADD(NOW(), INTERVAL -35 DAY), false),
(6, 2, 'MEMBER', DATE_ADD(NOW(), INTERVAL -20 DAY), false),
(7, 2, 'MEMBER', DATE_ADD(NOW(), INTERVAL -25 DAY), false),

-- 월간 독서 클럽
(4, 3, 'CAPTAIN', DATE_ADD(NOW(), INTERVAL -365 DAY), false),
(5, 3, 'MEMBER', DATE_ADD(NOW(), INTERVAL -355 DAY), false),
(6, 3, 'MEMBER', DATE_ADD(NOW(), INTERVAL -340 DAY), false),
(7, 3, 'MEMBER', DATE_ADD(NOW(), INTERVAL -320 DAY), false),
(8, 3, 'MEMBER', DATE_ADD(NOW(), INTERVAL -300 DAY), false),

-- 자격증 취득 스터디
(5, 4, 'CAPTAIN', DATE_ADD(NOW(), INTERVAL -12 DAY), false),
(6, 4, 'MEMBER', DATE_ADD(NOW(), INTERVAL -10 DAY), false),
(7, 4, 'MEMBER', DATE_ADD(NOW(), INTERVAL -15 DAY), false),
(8, 4, 'MEMBER', DATE_ADD(NOW(), INTERVAL -20 DAY), false),

-- 코딩 마스터 스터디
(6, 5, 'CAPTAIN', DATE_ADD(NOW(), INTERVAL -54 DAY), false),
(7, 5, 'MEMBER', DATE_ADD(NOW(), INTERVAL -60 DAY), false),
(8, 5, 'MEMBER', DATE_ADD(NOW(), INTERVAL -50 DAY), false),
(2, 5, 'MEMBER', DATE_ADD(NOW(), INTERVAL -45 DAY), false),

-- 심층 토론 스터디
(7, 6, 'CAPTAIN', DATE_ADD(NOW(), INTERVAL -10 DAY), false),
(8, 6, 'MEMBER', DATE_ADD(NOW(), INTERVAL -5 DAY), false),
(2, 6, 'MEMBER', DATE_ADD(NOW(), INTERVAL -15 DAY), false),
(3, 6, 'MEMBER', DATE_ADD(NOW(), INTERVAL -20 DAY), false),
(4, 6, 'MEMBER', DATE_ADD(NOW(), INTERVAL -12 DAY), false),

-- AI 연구 스터디
(8, 7, 'CAPTAIN', DATE_ADD(NOW(), INTERVAL -20 DAY), false),
(2, 7, 'MEMBER', DATE_ADD(NOW(), INTERVAL -25 DAY), false),
(3, 7, 'MEMBER', DATE_ADD(NOW(), INTERVAL -30 DAY), false),
(4, 7, 'MEMBER', DATE_ADD(NOW(), INTERVAL -22 DAY), false),

(5, 8, 'CAPTAIN', DATE_ADD(NOW(), INTERVAL -10 DAY), false),
(2, 8, 'MEMBER', DATE_ADD(NOW(), INTERVAL -9 DAY), false),
(3, 8, 'MEMBER', DATE_ADD(NOW(), INTERVAL -8 DAY), false),
(4, 8, 'MEMBER', DATE_ADD(NOW(), INTERVAL -9 DAY), false),
(6, 8, 'MEMBER', DATE_ADD(NOW(), INTERVAL -8 DAY), false),
(7, 8, 'MEMBER', DATE_ADD(NOW(), INTERVAL -9 DAY), false)
;

--Tag--
INSERT INTO tag (id, name)
VALUES (1, '컴퓨터공학'),
       (2, '모의 면접'),
       (3, '취업'),
       (4, '삼성'),
       (5, '마음의 양식'),
       (6, '개발자'),
       (7, '토론'),
       (8, '회의'),
       (9, 'AI'),
       (10, '자격증'),
       (11, '취준'),
       (12, '알고리즘'),
       (13, '자소서'),
       (14, '정처기'),
       (15, '시사 토론'),
       (16, '프로그래밍'),
       (17, '코딩'),
       (18, '코드리뷰'),
       (19, '비판적 사고'),
       (20, '인공지능'),
       (21, '한국사'),
       (22, '역사')
;

--STUDY GROUP TAG--
--INSERT INTO study_group_tag (tag_id, study_group_id)
INSERT INTO study_group_tag (study_group_id, tag_id)
VALUES
(1, 1),
(1, 2),

(2, 1),
(2, 3),
(2, 4),
(2, 6),
(2, 11),

(3, 1),
(3, 5),
(3, 11),

(4, 1),
(4, 10),
(4, 14),

(5, 1),
(5, 6),
(5, 11),
(5, 12),
(5, 17),

(6, 7),
(6, 9),
(6, 15),
(6, 19),

(7, 7),
(7, 9),
(7, 15),
(7, 19),
(7, 20),

(8, 10),
(8, 21),
(8, 22)

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
                let_avatar_speak(
                    string_concat(
                        int_to_string(get_int_variable('current_phase')),
                        '번 페이즈에 진입합니다. 다시한번 말씀드립니다. 이제 곧',
                        int_to_string(get_int_variable('current_phase')),
                        '번 페이즈에 진입합니다.'
                    )
                );
                loop(3) {
                    let_avatar_speak(
                        string_concat(
                            int_to_string(get_num_of_iteration()),
                            '번 루프를 진행중입니다. 즐거운 시간 보내시길 바랍니다!'
                        )
                    );
                }
            }
            phase(2) {
                let_avatar_speak(
                    string_concat(
                        int_to_string(get_int_variable('current_phase')),
                        '번 페이즈에 진입합니다. 다시한번 말씀드립니다. 이제 곧',
                        int_to_string(get_int_variable('current_phase')),
                        '번 페이즈에 진입합니다.'
                    )
                );
                loop(3) {
                    let_avatar_speak(
                        string_concat(
                            int_to_string(get_num_of_iteration()),
                            '번 루프를 진행중입니다. 즐거운 시간 보내시길 바랍니다!'
                        )
                    );
                }
            }
            phase(3) {
                let_avatar_speak(
                    string_concat(
                        int_to_string(get_int_variable('current_phase')),
                        '번 페이즈에 진입합니다. 다시한번 말씀드립니다. 이제 곧',
                        int_to_string(get_int_variable('current_phase')),
                        '번 페이즈에 진입합니다.'
                    )
                );
                loop(3) {
                    let_avatar_speak(
                        string_concat(
                            int_to_string(get_num_of_iteration()),
                            '번 루프를 진행중입니다. 즐거운 시간 보내시길 바랍니다!'
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
INSERT INTO conference (host_id, study_group_id, moderator_id, image_id, title, subject, member_capacity, open_time, start_time, scheduled_time, finish_time, close_time, ai_review)
VALUES
-- 삼성 챌린지 컨퍼런스
(3, 2, 1, 1, '삼성 채용 트렌드 분석', '2024년 삼성 채용 트렌드 분석과 준비 전략에 대해 논의합니다.', 10, DATE_ADD(NOW(), INTERVAL -10 DAY), DATE_ADD(NOW(), INTERVAL -9 DAY), null, DATE_ADD(NOW(), INTERVAL -8 DAY), DATE_ADD(NOW(), INTERVAL -7 DAY), '효과적인 트렌드 분석으로 면접 준비에 도움이 되었다.'),
(3, 2, 2, 1, '삼성 직무 분석 및 자기소개서 작성', '삼성 각 직무에 대한 분석과 효과적인 자기소개서 작성 방법을 공유합니다.', 10, DATE_ADD(NOW(), INTERVAL -8 DAY), DATE_ADD(NOW(), INTERVAL -7 DAY), null, DATE_ADD(NOW(), INTERVAL -6 DAY), DATE_ADD(NOW(), INTERVAL -5 DAY), '직무 분석과 자기소개서 작성에 많은 도움이 되었다.'),
(3, 2, 3, 1, '인적성 검사 대비', '삼성 인적성 검사 준비 방법과 모의 테스트를 진행합니다.', 10, DATE_ADD(NOW(), INTERVAL -4 DAY), DATE_ADD(NOW(), INTERVAL -3 DAY), null, DATE_ADD(NOW(), INTERVAL -2 DAY), DATE_ADD(NOW(), INTERVAL -1 DAY), '모의 테스트를 통해 실전 감각을 익힐 수 있었다.'),
(3, 2, 4, 1, '실전 모의면접 연습', '삼성 면접을 대비한 실전 모의면접 세션입니다.', 10, null, null, DATE_ADD(NOW(), INTERVAL 2 DAY), null, null, null),

-- 코딩 마스터 스터디 컨퍼런스
(6, 5, 4, 1, '최신 개발 기술 탐구 및 실습', '최신 개발 기술 동향을 탐구하고 실습하는 시간입니다.', 10, DATE_ADD(NOW(), INTERVAL -20 DAY), DATE_ADD(NOW(), INTERVAL -19 DAY), null, DATE_ADD(NOW(), INTERVAL -18 DAY), DATE_ADD(NOW(), INTERVAL -17 DAY), '새로운 기술을 실제 프로젝트에 적용할 수 있어 유익했다.'),
(6, 5, 5, 1, '알고리즘 문제 풀기 및 코드 리뷰하기', '복잡한 알고리즘 문제를 풀고 코드 리뷰를 통해 개선합니다.', 10, DATE_ADD(NOW(), INTERVAL -15 DAY), DATE_ADD(NOW(), INTERVAL -14 DAY), null, DATE_ADD(NOW(), INTERVAL -13 DAY), DATE_ADD(NOW(), INTERVAL -12 DAY), '코드 리뷰를 통해 다른 접근법을 배울 수 있었다.'),
(6, 5, 6, 1, '클린코드 읽고 코드 리뷰 및 개선하기', '클린코드를 읽고 자신의 코드를 리뷰하여 개선하는 세션입니다.', 10, DATE_ADD(NOW(), INTERVAL -10 DAY), DATE_ADD(NOW(), INTERVAL -9 DAY), null, DATE_ADD(NOW(), INTERVAL -8 DAY), DATE_ADD(NOW(), INTERVAL -7 DAY), '코드 품질 향상에 매우 도움이 되었다.'),
(6, 5, 2, 1, '자료구조 학습하기', '자료구조의 기초부터 심화까지 학습하는 세션입니다.', 10, null, null, DATE_ADD(NOW(), INTERVAL 3 DAY), null, null, null),

-- 정처기 자격증 스터디 컨퍼런스
(5, 4, 1, 1, '데이터베이스', '데이터베이스 이론 및 실습을 다루는 세션입니다.', 10, DATE_ADD(NOW(), INTERVAL -5 DAY), DATE_ADD(NOW(), INTERVAL -4 DAY), null, DATE_ADD(NOW(), INTERVAL -3 DAY), DATE_ADD(NOW(), INTERVAL -2 DAY), '데이터베이스의 중요 개념을 정리할 수 있었다.'),
(5, 4, 3, 1, '운영 체제', '운영 체제의 개념과 관련 문제를 다루는 세션입니다.', 10, null, null, DATE_ADD(NOW(), INTERVAL 1 DAY), null, null, null),
(5, 4, 5, 1, '소프트웨어 공학', '소프트웨어 공학의 이론과 실제를 학습하는 시간입니다.', 10, null, null, DATE_ADD(NOW(), INTERVAL 5 DAY), null, null, null),
(5, 4, 6, 1, '네트워크', '네트워크의 기본 원리와 심화 내용을 다루는 세션입니다.', 10, null, null, DATE_ADD(NOW(), INTERVAL 10 DAY), null, null, null),

-- AI 토론 스터디 컨퍼런스
(8, 7, 2, 1, 'AI 의 발전이 일자리에 미치는 영향', 'AI의 발전이 일자리에 미치는 긍정적 및 부정적 영향을 논의합니다.', 10, DATE_ADD(NOW(), INTERVAL -3 DAY), DATE_ADD(NOW(), INTERVAL -2 DAY), null, DATE_ADD(NOW(), INTERVAL -1 DAY), DATE_ADD(NOW(), INTERVAL -30 MINUTE), '다양한 시각에서 AI와 일자리의 관계를 이해할 수 있었다.'),
(8, 7, 3, 1, 'AI 윤리 문제, 어디까지 허용할 수 있는가', 'AI 윤리에 대한 사회적 논의와 한계를 토론합니다.', 10, null, null, DATE_ADD(NOW(), INTERVAL 1 DAY), null, null, null),
(8, 7, 4, 1, '자동화가 인간의 삶에 미치는 긍정 vs 부정 영향', '자동화의 장단점을 토론하며 미래 사회를 예측합니다.', 10, null, null, DATE_ADD(NOW(), INTERVAL 7 DAY), null, null, null),
(8, 7, 1, 1, 'AI가 만드는 예술, 진짜 예술일까', 'AI가 창작하는 예술의 가치에 대해 토론합니다.', 10, null, null, DATE_ADD(NOW(), INTERVAL 14 DAY), null, null, null),

-- 시사 토론 모임 컨퍼런스
(7, 6, 6, 1, 'AI의 발전과 윤리적 문제, 어디까지 허용할까?', 'AI 발전과 관련된 윤리적 문제를 논의합니다.', 10, DATE_ADD(NOW(), INTERVAL -2 DAY), DATE_ADD(NOW(), INTERVAL -1 DAY), null, DATE_ADD(NOW(), INTERVAL -30 MINUTE), DATE_ADD(NOW(), INTERVAL -10 MINUTE), 'AI 윤리에 대한 깊이 있는 논의를 할 수 있었다.'),
(7, 6, 3, 1, '환경 보호 vs 경제 성장, 균형점 찾기 토론', '환경 보호와 경제 성장 간의 균형을 찾는 방안을 논의합니다.', 10, null, null, DATE_ADD(NOW(), INTERVAL 3 DAY), null, null, null),
(7, 6, 2, 1, '인터넷 검열과 표현의 자유, 경계는 어디에?', '인터넷 검열과 표현의 자유 사이의 경계에 대해 토론합니다.', 10, null, null, DATE_ADD(NOW(), INTERVAL 8 DAY), null, null, null),
(7, 6, 4, 1, '유전자 편집의 윤리성, 사회적 수용 가능성은?', '유전자 편집 기술의 윤리적 문제와 사회적 수용 가능성에 대해 논의합니다.', 10, null, null, DATE_ADD(NOW(), INTERVAL 12 DAY), null, null, null);

-- 과거에 종료된 컨퍼런스
INSERT INTO conference (host_id, study_group_id, moderator_id, image_id, title, subject, member_capacity, open_time, start_time, scheduled_time, finish_time, close_time, ai_review)
VALUES
(4, 3, 1, 1, '총, 균, 쇠 독후감 토론 : 인류 문명의 발달 원인을 찾아서',
'제러드 다이아몬드의 명저 "총, 균, 쇠"를 읽고 인류 문명의 발달 원인에 대해 토론합니다.', 10,
DATE_ADD(NOW(), INTERVAL -60 DAY), DATE_ADD(NOW(), INTERVAL -58 DAY), DATE_ADD(NOW(), INTERVAL -57 DAY), DATE_ADD(NOW(), INTERVAL -55 DAY), DATE_ADD(NOW(), INTERVAL -54 DAY), '활발한 토론과 심층적인 논의가 이루어짐.'),

(5, 3, 2, 1, '유발 하라리의 사피엔스 독후감 스터디: 인류의 역사와 미래',
'유발 하라리의 "사피엔스"를 읽고 인류의 역사와 미래에 대해 논의합니다.', 10,
DATE_ADD(NOW(), INTERVAL -40 DAY), DATE_ADD(NOW(), INTERVAL -38 DAY), DATE_ADD(NOW(), INTERVAL -37 DAY), DATE_ADD(NOW(), INTERVAL -35 DAY), DATE_ADD(NOW(), INTERVAL -34 DAY), '인류의 역사와 미래에 대한 다양한 관점이 공유됨.'),

-- 현재 진행 중인 컨퍼런스
(6, 3, 3, 1, '호밀밭의 파수꾼 독후감 스터디: 청소년기의 혼란과 성장',
'J.D. 샐린저의 "호밀밭의 파수꾼"을 읽고 청소년기의 혼란과 성장에 대해 토론합니다.', 10,
DATE_ADD(NOW(), INTERVAL -10 DAY), DATE_ADD(NOW(), INTERVAL -9 DAY), DATE_ADD(NOW(), INTERVAL -8 DAY), DATE_ADD(NOW(), INTERVAL -5 DAY), DATE_ADD(NOW(), INTERVAL -3 DAY), '청소년기의 정서와 사회적 도전에 대해 심도 있는 논의가 이루어짐.'),

-- 미래에 예정된 컨퍼런스
(7, 3, 4, 1, '하버드대 심리학 교수의 하버드 행복 수업 독후감 스터디',
'하버드대 심리학 교수의 "하버드 행복 수업"을 읽고 행복에 대해 탐구합니다.', 10,
NULL, NULL, DATE_ADD(NOW(), INTERVAL 5 DAY), NULL, NULL, NULL);

-- 한국사
INSERT INTO conference (host_id, study_group_id, moderator_id, image_id, title, subject, member_capacity, open_time, start_time, scheduled_time, finish_time, close_time, ai_review)
VALUES
(5, 8, 4, 19, '근대 한국사 스터디',
'근대 한국사에 대해 서로 퀴즈를 내며 공부합니다.', 10,
NULL, NULL, DATE_ADD(NOW(), INTERVAL 1 DAY), NULL, NULL, NULL);

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
VALUES
    (1, 'CS 면접 준비 체크리스트', 'CS 전공 면접에 대비하기 위한 체크리스트를 공유합니다. 필수 준비 사항과 추천 공부 자료를 확인해 보세요.', DATE_ADD(NOW(), INTERVAL -2 DAY), FALSE, 3, 1, 1),
    (2, 'CS 전공 면접 Q&A', 'CS 전공 면접에서 자주 나오는 질문과 그에 대한 답변을 공유합니다. 여러분의 경험도 댓글로 남겨주세요.', DATE_ADD(NOW(), INTERVAL -5 DAY), FALSE, 4, 1, 1),
    (3, 'CS 전공 면접 후기', '최근 CS 전공 면접을 본 후기를 공유합니다. 어떤 질문을 받았고, 어떻게 준비했는지 이야기해 주세요.', DATE_ADD(NOW(), INTERVAL -7 DAY), FALSE, 2, 1, 1),

    -- 삼성 공채 준비 스터디 게시글
    (4, '삼성 공채 자기소개서 작성 팁', '삼성 공채 자기소개서를 잘 작성하기 위한 팁과 예시를 공유합니다. 함께 좋은 자기소개서를 만들어 보아요.', DATE_ADD(NOW(), INTERVAL -1 WEEK), FALSE, 4, 2, 1),
    (5, '삼성 공채 면접 질문 목록', '삼성 공채 면접에서 자주 나오는 질문 목록과 답변 준비 방법을 공유합니다. 참고해서 면접 준비를 해보세요.', DATE_ADD(NOW(), INTERVAL -10 DAY), FALSE, 5, 2, 1),

    -- 월간 독서 클럽 게시글
    (6, '이번 달 책: 《책 제목》', '이번 달 독서 클럽의 책은 《책 제목》입니다. 함께 읽고 의견을 나누어 보아요.', DATE_ADD(NOW(), INTERVAL -3 DAY), FALSE, 6, 3, 1),
    (7, '독서 클럽 회의 일정', '다음 독서 클럽 회의 일정과 장소를 안내드립니다. 많은 참여 부탁드립니다.', DATE_ADD(NOW(), INTERVAL -5 DAY), FALSE, 4, 3, 1),
    (8, '지난 달 책 리뷰: 《지난 책 제목》', '지난 달에 읽었던 《지난 책 제목》에 대한 리뷰를 공유합니다. 여러분의 의견도 댓글로 남겨주세요.', DATE_ADD(NOW(), INTERVAL -10 DAY), FALSE, 5, 3, 1),

    -- 자격증 취득 스터디 게시글
    (9, '자격증 시험 준비 전략', '자격증 시험을 효과적으로 준비하기 위한 전략과 공부법을 공유합니다. 서로의 노하우를 나눠 보세요.', DATE_ADD(NOW(), INTERVAL -2 DAY), FALSE, 3, 4, 1),
    (10, '자격증 공부 자료 공유', '자격증 취득에 유용한 공부 자료와 참고서를 공유합니다. 좋은 자료가 있다면 댓글로 추가해 주세요.', DATE_ADD(NOW(), INTERVAL -1 WEEK), FALSE, 2, 4, 1),
    (11, '자격증 시험 후기', '최근 자격증 시험을 본 후기를 공유합니다. 시험 난이도와 준비 과정 등을 이야기해 주세요.', DATE_ADD(NOW(), INTERVAL -15 DAY), FALSE, 4, 4, 1),

    -- 코딩 마스터 스터디 게시글
    (12, '코딩 문제 풀이 세션', '이번 주 코딩 문제 풀이 세션의 문제를 공유합니다. 풀이와 함께 코멘트를 남겨 보세요.', DATE_ADD(NOW(), INTERVAL -4 DAY), FALSE, 4, 5, 1),
    (13, '코딩 프로젝트 진행 상황', '현재 진행 중인 코딩 프로젝트의 상황을 공유합니다. 진행 상황과 문제점을 함께 논의해 보아요.', DATE_ADD(NOW(), INTERVAL -7 DAY), FALSE, 3, 5, 1),
    (14, '알고리즘 문제 추천', '코딩 실력을 키우기 위한 알고리즘 문제를 추천합니다. 도전해 보고 자신의 풀이를 공유해 주세요.', DATE_ADD(NOW(), INTERVAL -2 WEEK), FALSE, 5, 5, 1),

    -- 심층 토론 스터디 게시글
    (15, '시사 이슈 토론 주제', '이번 주 시사 이슈에 대한 토론 주제를 제안합니다. 논리적이고 깊이 있는 토론을 진행해 봅시다.', DATE_ADD(NOW(), INTERVAL -3 DAY), FALSE, 5, 6, 1),
    (16, '사회 이슈에 대한 의견', '현재 사회 이슈에 대한 자신의 의견을 공유합니다. 다양한 관점을 나누어 보아요.', DATE_ADD(NOW(), INTERVAL -5 DAY), FALSE, 3, 6, 1),
    (17, '토론 스킬 향상 방법', '토론 스킬을 향상시키기 위한 방법과 팁을 공유합니다. 좋은 방법이 있다면 댓글로 남겨주세요.', DATE_ADD(NOW(), INTERVAL -10 DAY), FALSE, 4, 6, 1),

    -- AI 연구 스터디 게시글
    (18, '최신 AI 연구 논문 리뷰', '최근 발표된 AI 연구 논문을 리뷰합니다. 논문 내용과 주요 결과를 함께 분석해 보아요.', DATE_ADD(NOW(), INTERVAL -2 DAY), FALSE, 2, 7, 1),
    (19, 'AI 연구 프로젝트 아이디어', 'AI 연구 프로젝트를 위한 아이디어를 공유합니다. 새로운 프로젝트에 대해 논의해 봅시다.', DATE_ADD(NOW(), INTERVAL -7 DAY), FALSE, 3, 7, 1),
    (20, 'AI 기술 동향 보고서', '최근 AI 기술 동향에 대한 보고서를 공유합니다. 기술 발전과 트렌드를 함께 살펴보아요.', DATE_ADD(NOW(), INTERVAL -15 DAY), FALSE, 4, 7, 1),

    -- 한국사 스터디 게시글
    (21, '근현대사 주요 사건 정리', '한국 근현대사에서 중요한 사건들을 정리하고 분석합니다. 사건의 배경과 결과를 함께 토론해 봅시다.', DATE_ADD(NOW(), INTERVAL -3 DAY), FALSE, 3, 5, 8),
    (22, '한국사 시험 대비 문제 풀이', '한국사 시험 대비를 위한 문제 풀이 세션입니다. 기출 문제를 함께 풀어보며 준비해요.', DATE_ADD(NOW(), INTERVAL -5 DAY), FALSE, 6, 6, 8),
    (23, '역사적 인물 분석', '한국 근현대사에서 중요한 역할을 한 인물들에 대해 분석합니다. 그들의 영향력과 업적을 살펴봅니다.', DATE_ADD(NOW(), INTERVAL -5 DAY), FALSE, 5, 3, 8),
    (24, '근현대사 시험 후기', '최근 치른 한국사 시험에 대한 후기를 공유합니다. 시험의 난이도와 문제 유형을 함께 논의해 봅시다.', DATE_ADD(NOW(), INTERVAL -2 DAY), FALSE, 1, 2, 8),
    (25, '한국사 공부 방법 공유', '효과적인 한국사 공부 방법을 공유합니다. 각자의 공부 팁과 노하우를 나누어 봅시다.', DATE_ADD(NOW(), INTERVAL -3 DAY), FALSE, 4, 7, 8)
;

--COMMENTS--
INSERT INTO comment (content, created_at, article_id, member_id, is_deleted)
VALUES
    -- 게시글 1
    ('CS 면접 준비 체크리스트 감사합니다. 매우 유용했어요!', DATE_ADD(NOW(), INTERVAL -1 DAY), 1, 3, FALSE),
    ('체크리스트 중 추천 자료가 무엇인지 더 알고 싶어요.', DATE_ADD(NOW(), INTERVAL -1 DAY), 1, 4, FALSE),

    -- 게시글 2
    ('면접에서 정말 자주 나오는 질문들입니다. 도움 됐어요.', DATE_ADD(NOW(), INTERVAL -4 DAY), 2, 5, FALSE),
    ('답변 준비하는 데 유용하네요. 추가적인 질문도 알고 싶어요.', DATE_ADD(NOW(), INTERVAL -4 DAY), 2, 2, FALSE),
    ('저는 이런 질문도 있었어요: [질문 내용]', DATE_ADD(NOW(), INTERVAL -4 DAY), 2, 6, FALSE),

    -- 게시글 3
    ('최근 면접 준비 잘 했어요! 질문 내용과 경험 공유 감사합니다.', DATE_ADD(NOW(), INTERVAL -6 DAY), 3, 3, FALSE),

    -- 삼성 공채 준비 스터디 게시글 댓글
    -- 게시글 4
    ('자기소개서 작성 팁이 정말 도움이 됩니다. 감사합니다.', DATE_ADD(NOW(), INTERVAL -3 DAY), 4, 5, FALSE),
    ('예시가 매우 유용하네요. 다른 참고 자료도 있으면 좋겠어요.', DATE_ADD(NOW(), INTERVAL -3 DAY), 4, 2, FALSE),

    -- 게시글 5
    ('면접 질문 목록 참고하겠습니다. 좋은 정보 감사합니다.', DATE_ADD(NOW(), INTERVAL -8 DAY), 5, 3, FALSE),
    ('이 질문 외에 다른 질문도 있으셨나요?', DATE_ADD(NOW(), INTERVAL -8 DAY), 5, 7, FALSE),

    -- 월간 독서 클럽 게시글 댓글
    -- 게시글 6
    ('《책 제목》 정말 흥미로운 책이네요. 기대됩니다.', DATE_ADD(NOW(), INTERVAL -2 DAY), 6, 4, FALSE),
    ('다음 모임에서 더 자세한 이야기를 듣고 싶어요.', DATE_ADD(NOW(), INTERVAL -2 DAY), 6, 5, FALSE),

    -- 게시글 7
    ('회의 일정 확인했습니다. 참석하겠습니다!', DATE_ADD(NOW(), INTERVAL -4 DAY), 7, 3, FALSE),

    -- 게시글 8
    ('《지난 책 제목》 리뷰 잘 읽었습니다. 매우 유익하네요.', DATE_ADD(NOW(), INTERVAL -8 DAY), 8, 6, FALSE),
    ('이 책을 읽고 저도 이런 의견이 있습니다: [의견 내용]', DATE_ADD(NOW(), INTERVAL -8 DAY), 8, 7, FALSE),
    ('책에 대해 더 논의할 부분이 많아요.', DATE_ADD(NOW(), INTERVAL -8 DAY), 8, 2, FALSE),

    -- 자격증 취득 스터디 게시글 댓글
    -- 게시글 9
    ('자격증 시험 준비 전략, 잘 참고하겠습니다. 감사합니다.', DATE_ADD(NOW(), INTERVAL -1 DAY), 9, 3, FALSE),
    ('다른 사람들의 전략도 듣고 싶어요.', DATE_ADD(NOW(), INTERVAL -1 DAY), 9, 6, FALSE),

    -- 게시글 10
    -- ('공부 자료를 공유해 주셔서 감사합니다.', DATE_ADD(NOW(), INTERVAL -6 DAY), 10, 2, FALSE),

    -- 게시글 11
    ('시험 후기 공유 감사합니다. 저도 비슷한 경험이 있었습니다.', DATE_ADD(NOW(), INTERVAL -12 DAY), 11, 5, FALSE),
    ('시험 준비하면서 도움 될 만한 조언이 있으면 좋겠어요.', DATE_ADD(NOW(), INTERVAL -12 DAY), 11, 4, FALSE),
    ('시험 후기와 관련된 더 많은 정보가 궁금합니다.', DATE_ADD(NOW(), INTERVAL -12 DAY), 11, 7, FALSE),

    -- 코딩 마스터 스터디 게시글 댓글
    -- 게시글 12
    ('코딩 문제 풀이 세션 문제, 잘 확인했습니다.', DATE_ADD(NOW(), INTERVAL -3 DAY), 12, 2, FALSE),
    ('문제 풀이에 대한 의견을 공유합니다: [의견 내용]', DATE_ADD(NOW(), INTERVAL -3 DAY), 12, 6, FALSE),
    ('문제 풀이를 함께 하는 것도 좋을 것 같습니다.', DATE_ADD(NOW(), INTERVAL -3 DAY), 12, 7, FALSE),

    -- 게시글 13
    ('프로젝트 진행 상황 잘 보고 있습니다. 화이팅입니다!', DATE_ADD(NOW(), INTERVAL -6 DAY), 13, 5, FALSE),

    -- 게시글 14
    ('추천해 주신 알고리즘 문제를 시도해 보겠습니다.', DATE_ADD(NOW(), INTERVAL -12 DAY), 14, 4, FALSE),
    ('문제에 대한 해설을 추가해 주시면 좋겠습니다.', DATE_ADD(NOW(), INTERVAL -12 DAY), 14, 3, FALSE),
    ('다음 문제도 기대됩니다.', DATE_ADD(NOW(), INTERVAL -12 DAY), 14, 2, FALSE),

    -- 심층 토론 스터디 게시글 댓글
    -- 게시글 15
    ('토론 주제 좋습니다. 의견을 나누어 보아요.', DATE_ADD(NOW(), INTERVAL -2 DAY), 15, 4, FALSE),
    ('논리적 사고를 키우기 위한 다른 주제도 있으면 좋겠어요.', DATE_ADD(NOW(), INTERVAL -2 DAY), 15, 5, FALSE),

    -- 게시글 16
    ('사회 이슈에 대한 의견을 나누는 것이 중요하다고 생각합니다.', DATE_ADD(NOW(), INTERVAL -4 DAY), 16, 2, FALSE),
    ('이 이슈에 대해 더 논의할 부분이 많습니다.', DATE_ADD(NOW(), INTERVAL -4 DAY), 16, 6, FALSE),

    -- 게시글 17
    ('토론 스킬 향상 방법 좋네요. 더 많은 팁이 있으면 좋겠어요.', DATE_ADD(NOW(), INTERVAL -8 DAY), 17, 3, FALSE),
    ('다양한 방법을 시도해 보고 싶습니다.', DATE_ADD(NOW(), INTERVAL -8 DAY), 17, 7, FALSE),

    -- AI 연구 스터디 게시글 댓글
    -- 게시글 18
    ('최신 AI 논문 리뷰 잘 읽었습니다. 많은 도움이 되었습니다.', DATE_ADD(NOW(), INTERVAL -1 DAY), 18, 5, FALSE),

    -- 게시글 19
    ('AI 연구 프로젝트 아이디어 좋습니다. 함께 논의해 보아요.', DATE_ADD(NOW(), INTERVAL -5 DAY), 19, 6, FALSE),
    ('프로젝트 아이디어에 대한 의견이 있습니다.', DATE_ADD(NOW(), INTERVAL -5 DAY), 19, 2, FALSE),

    -- 게시글 20
    ('AI 기술 동향 보고서 유용하네요. 감사합니다.', DATE_ADD(NOW(), INTERVAL -12 DAY), 20, 4, FALSE),
    ('기술 동향에 대한 더 많은 정보가 있으면 좋겠습니다.', DATE_ADD(NOW(), INTERVAL -12 DAY), 20, 7, FALSE),
    ('트렌드 분석에 대한 의견을 공유합니다.', DATE_ADD(NOW(), INTERVAL -12 DAY), 20, 3, FALSE);



-- 한국사
INSERT INTO comment (content, created_at, article_id, member_id, is_deleted)
VALUES
    -- 근현대사 주요 사건 정리 (article_id 21)
    ('이 사건은 정말 중요한 전환점이었어요. 자세한 토론 기대합니다.', DATE_ADD(NOW(), INTERVAL -2 DAY), 21, 2, FALSE),
    ('이 부분에서 더 깊이 있게 분석하면 좋을 것 같아요.', DATE_ADD(NOW(), INTERVAL -1 DAY), 21, 4, FALSE),

    -- 한국사 시험 대비 문제 풀이 (article_id 22)
    ('이 문제 너무 어렵네요. 같이 풀어보면 좋을 것 같아요.', DATE_ADD(NOW(), INTERVAL -4 DAY), 22, 6, FALSE),
    ('좋은 문제 감사합니다. 시험 준비에 도움이 많이 될 것 같아요.', DATE_ADD(NOW(), INTERVAL -3 DAY), 22, 3, FALSE),

    -- 역사적 인물 분석 (article_id 23)
    ('이 인물의 업적은 정말 대단합니다. 잘 정리해 주셔서 감사합니다.', DATE_ADD(NOW(), INTERVAL -4 DAY), 23, 5, FALSE),
    ('이 인물에 대한 다른 자료도 함께 공유해 주실 수 있을까요?', DATE_ADD(NOW(), INTERVAL -2 DAY), 23, 7, FALSE),

    -- 근현대사 시험 후기 (article_id 24)
    ('시험 후기 잘 읽었습니다. 저도 비슷한 문제를 겪었어요.', DATE_ADD(NOW(), INTERVAL -1 DAY), 24, 4, FALSE),
    ('시험이 정말 어려웠네요. 후기 공유 감사합니다.', DATE_ADD(NOW(), INTERVAL -1 DAY), 24, 6, FALSE),

    -- 한국사 공부 방법 공유 (article_id 25)
    ('좋은 공부 방법 공유해 주셔서 감사합니다. 저도 활용해 봐야겠어요.', DATE_ADD(NOW(), INTERVAL -2 DAY), 25, 2, FALSE),
    ('이 방법 정말 효과적일 것 같아요. 덕분에 도움이 됩니다.', DATE_ADD(NOW(), INTERVAL -1 DAY), 25, 3, FALSE);

;

--ARTICLE_TAGS--
INSERT INTO article_tag (article_id, tag_id)
VALUES
    -- 'CS 면접 준비 체크리스트'
    (1, 1),  -- 컴퓨터공학
    (1, 2),  -- 모의 면접
    (1, 3),  -- 취업

    -- 'CS 전공 면접 Q&A'
    (2, 1),  -- 컴퓨터공학
    (2, 2),  -- 모의 면접
    (2, 3),  -- 취업

    -- 'CS 전공 면접 후기'
    (3, 1),  -- 컴퓨터공학
    (3, 3),  -- 취업

    -- 삼성 공채 준비 스터디 게시글
    -- '삼성 공채 자기소개서 작성 팁'
    (4, 4),  -- 삼성
    (4, 13), -- 자소서
    (4, 3),  -- 취업

    -- '삼성 공채 면접 질문 목록'
    (5, 4),  -- 삼성
    (5, 3),  -- 취업
    (5, 2),  -- 모의 면접

    -- 월간 독서 클럽 게시글
    -- '이번 달 책: 《책 제목》'
    (6, 5),  -- 마음의 양식
    (6, 8),  -- 회의

    -- '독서 클럽 회의 일정'
    (7, 8),  -- 회의

    -- '지난 달 책 리뷰: 《지난 책 제목》'
    (8, 5),  -- 마음의 양식

    -- 자격증 취득 스터디 게시글
    -- '자격증 시험 준비 전략'
    (9, 10), -- 자격증
    (9, 3),  -- 취업

    -- '자격증 공부 자료 공유'
    (10, 10), -- 자격증

    -- '자격증 시험 후기'
    (11, 10), -- 자격증
    (11, 3),  -- 취업

    -- 코딩 마스터 스터디 게시글
    -- '코딩 문제 풀이 세션'
    (12, 17), -- 코딩
    (12, 12), -- 알고리즘

    -- '코딩 프로젝트 진행 상황'
    (13, 17), -- 코딩
    (13, 12), -- 알고리즘

    -- '알고리즘 문제 추천'
    (14, 12), -- 알고리즘
    (14, 17), -- 코딩

    -- 심층 토론 스터디 게시글
    -- '시사 이슈 토론 주제'
    (15, 7),  -- 토론
    (15, 15), -- 시사 토론

    -- '사회 이슈에 대한 의견'
    (16, 7),  -- 토론
    (16, 15), -- 시사 토론

    -- '토론 스킬 향상 방법'
    (17, 7),  -- 토론
    (17, 19), -- 비판적 사고

    -- AI 연구 스터디 게시글
    -- '최신 AI 연구 논문 리뷰'
    (18, 9),  -- AI
    (18, 20), -- 인공지능

    -- 'AI 연구 프로젝트 아이디어'
    (19, 9),  -- AI
    (19, 20), -- 인공지능

    -- 'AI 기술 동향 보고서'
    (20, 9),  -- AI
    (20, 20);  -- 인공지능

INSERT INTO article_tag (article_id, tag_id)
VALUES
    -- 근현대사 주요 사건 정리 (article_id 21)
    (21, 21), -- 한국사
    (21, 22), -- 역사

    -- 한국사 시험 대비 문제 풀이 (article_id 22)
    (22, 21), -- 한국사
    (22, 22), -- 역사

    -- 역사적 인물 분석 (article_id 23)
    (23, 21), -- 한국사
    (23, 22), -- 역사

    -- 근현대사 시험 후기 (article_id 24)
    (24, 21), -- 한국사
    (24, 22), -- 역사

    -- 한국사 공부 방법 공유 (article_id 25)
    (25, 21), -- 한국사
    (25, 22)  -- 역사
;
