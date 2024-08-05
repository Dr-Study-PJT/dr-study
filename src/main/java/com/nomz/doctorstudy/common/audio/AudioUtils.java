package com.nomz.doctorstudy.common.audio;

import com.nomz.doctorstudy.common.exception.BusinessException;
import com.nomz.doctorstudy.common.exception.CommonErrorCode;
import lombok.extern.slf4j.Slf4j;

import javax.sound.sampled.*;
import java.io.*;

@Slf4j
public class AudioUtils {

    /**
     * 전달받은 절대경로에 있는 오디오 파일의 재생시간을 반환한다.
     * @param absolutePath 오디오 파일의 절대 경로
     * @return 오디오 파일의 재생시간 (밀리초 단위)
     */
    public static int getAudioLength(String absolutePath) {
        // FFmpeg 명령어 실행
        ProcessBuilder pb = new ProcessBuilder(
                "ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", absolutePath
        );

        try {
            Process process = pb.start();
            InputStream is = process.getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(is));
            String durationStr = reader.readLine();
            process.waitFor();
            double duration = Double.parseDouble(durationStr);
            return (int) Math.floor(duration * 1000);
        } catch (InterruptedException | IOException e) {
            throw new BusinessException(CommonErrorCode.INTERNAL_SERVER_ERROR, "failed to get audio length", e);
        }
    }

    public static void saveFile(byte[] data, String path) {
        File file = new File(path);
        if (file.getParentFile() != null) {
            file.getParentFile().mkdirs();
        }

        try (FileOutputStream fos = new FileOutputStream(file)) {
            fos.write(data);
            log.debug("saved file at {}", path);
        } catch (IOException e) {
            throw new BusinessException(CommonErrorCode.INTERNAL_SERVER_ERROR, "failed to save audio file", e);

        }
    }

    public static void convertAudio(String path, String newExt) {
        File file = new File(path);
        String srcAbsolutePath = file.getAbsolutePath();
        String destAbsolutePath = srcAbsolutePath.substring(0, srcAbsolutePath.lastIndexOf('.')) + "." + newExt;

        // FFmpeg 명령어 실행
        ProcessBuilder pb = new ProcessBuilder(
                "ffmpeg", "-i", srcAbsolutePath, "-y", destAbsolutePath);
        pb.inheritIO();
        try {
            Process process = pb.start();
            process.waitFor();
        } catch (InterruptedException | IOException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * 경로에 있는 오디오 파일을 재생한다.
     * 가능 확장자: .wav
     * 불가능 확장자: .webm, .mp3
     * @param path 재생할 오디오 파일의 경로
     */
    public static void playAudio(String path) {
        try {
            File file = new File(path);
            AudioInputStream audioInputStream = AudioSystem.getAudioInputStream(file);
            AudioFormat format = audioInputStream.getFormat();
            DataLine.Info info = new DataLine.Info(SourceDataLine.class, format);
            SourceDataLine line = (SourceDataLine) AudioSystem.getLine(info);

            line.open(format);
            line.start();

            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = audioInputStream.read(buffer, 0, buffer.length)) != -1) {
                line.write(buffer, 0, bytesRead);
            }

            line.drain();
            line.close();
        } catch (LineUnavailableException | IOException | UnsupportedAudioFileException e) {
            throw new RuntimeException(e);
        }
    }
}
