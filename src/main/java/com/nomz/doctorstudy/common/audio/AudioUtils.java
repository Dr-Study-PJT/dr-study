package com.nomz.doctorstudy.common.audio;

import org.springframework.web.socket.BinaryMessage;

import javax.sound.sampled.*;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class AudioUtils {
    private static final String TEMP_FILE_NAME = "audio_from_react";
    private static final String SRC_EXT = ".webm";
    private static final String DEST_EXT = ".wav";
    private static final String SRC_FILE_PATH = TEMP_FILE_NAME + SRC_EXT;
    private static final String DEST_FILE_PATH = TEMP_FILE_NAME + DEST_EXT;

    public static void playAudioFromByteArr(byte[] message) {
        saveFileFromByteArr(message);

        File srcFile = new File(SRC_FILE_PATH);
        File destFile = new File(DEST_FILE_PATH);

        AudioUtils.convert(srcFile, destFile);
        AudioUtils.playAudio(destFile);
    }

    private static void saveFileFromByteArr(byte[] payload) {
        try (FileOutputStream fos = new FileOutputStream(SRC_FILE_PATH)) {
            fos.write(payload);
            System.out.println("File saved at " + DEST_FILE_PATH);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static void convert(File srcFile, File destFile) {
        // FFmpeg 명령어 실행
        ProcessBuilder pb = new ProcessBuilder(
                "ffmpeg", "-i", srcFile.getAbsolutePath(), "-y", destFile.getAbsolutePath());
        pb.inheritIO();
        try {
            Process process = pb.start();
            process.waitFor();
        } catch (InterruptedException | IOException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     *
     * @param file 가능 확장자 : .wav 불가능 확장자 : .webm, .mp3
     */
    private static void playAudio(File file) {
        try {
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
