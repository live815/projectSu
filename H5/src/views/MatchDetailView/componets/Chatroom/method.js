import { addMemberMuteLog } from '@/api/chatroom.js'
import dayjs from 'dayjs'
import { useUserStore } from '@/stores/user.js'
import { showToast } from 'vant'
import { useChatroomStore } from '@/stores/chatroom'
import i18n from '@/i18n'

const user = useUserStore()
const chatStore = useChatroomStore()

export function handleUserBanned(isBan, vipArr) {
    if (!chatStore.chatroomConfig?.speakEnable) {
        showToast(i18n.global.t('Mletter.mlettertip7'))
    } else if (isBan) {
        showToast(i18n.global.t('Mletter.mlettertip3'))
    } else if (!vipArr.includes(user.userInfo.vipLevel) && ![1, 2].includes(user.userInfo.role)) {
        showToast(i18n.global.t('Mletter.mlettertip8'))
    }
}

// export function matchEmoticonsById(ids) {
//     const matchedEmoticons = emoticons1.filter((emoticon) => ids.includes(emoticon.id))
//     return matchedEmoticons
// }

// 计算两个字符串的编辑距离
function levenshteinDistance(str1, str2) {
    const matrix = Array.from({ length: str1.length + 1 }, () => Array(str2.length + 1).fill(0));

    for (let i = 0; i <= str1.length; i++) {
        for (let j = 0; j <= str2.length; j++) {
            if (i === 0) {
                matrix[i][j] = j;
            } else if (j === 0) {
                matrix[i][j] = i;
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + (str1[i - 1] !== str2[j - 1] ? 1 : 0),
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }

    return matrix[str1.length][str2.length];
}
// 计算消息相似度
export function calculateSimilarity(str1, str2) {
    // 获取字符串的最大长度
    const maxLength = Math.max(str1.length, str2.length);

    // 计算编辑距离
    const distance = levenshteinDistance(str1, str2);

    // 计算相似度
    const similarity = 1 - distance / maxLength;

    // 保留两位小数
    return similarity.toFixed(2);
}

/**
 * 聊天室刷屏检测函数
 * @param {string[]} messages - 包含聊天消息的数组
 * @param {string[]} threshold - 相似度阈值
 * @param {string[]} maxConsecutive - 连续相似消息的最大数量
 * @returns {boolean} - 如果触发刷屏规则则返回true，否则返回false
 */
export function floodDetection(messages, threshold, maxConsecutive) {

    let consecutiveCount = 0

    for (let i = 0; i < messages.length - 1; i++) {
        for (let j = i + 1; j < messages.length; j++) {
            // 计算消息相似度
            const similarity = calculateSimilarity(messages[i], messages[j]);
            // 如果相似度超过阈值
            if (similarity >= threshold) {
                consecutiveCount++;

                // 如果连续相似消息数量达到阈值，触发刷屏检测
                if (consecutiveCount >= maxConsecutive) {
                    // 触发刷屏检测
                    return true;
                }
            } else {
                // 重置连续相似消息数量
                consecutiveCount = 0
            }
        }
    }

    // 没有触发刷屏规则
    return false
}

// 计算解禁时间函数
export function calculateUnbanTime(banDurationMinutes) {
    // 获取当前时间的 Day.js 对象
    const currentTime = dayjs()

    // 计算禁言时长的毫秒数
    const banDurationMillis = banDurationMinutes * 60 * 1000

    // 计算解禁时间的 Day.js 对象，并转换为本地时间
    const unBanDate = currentTime.add(banDurationMillis, 'millisecond')

    const unBanTime = unBanDate.format('YYYY-MM-DD HH:mm:ss')
    return unBanTime
}

// 新增会员禁言记录
export function setGroupMemberMute(data) {
    const banTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    const param = {
        memberId: data.userId,
        chatRoomId: data.chatRoomId,
        banType: data.banType,
        duration: data.time,
        content: data.content,
        banBy: user.userInfo.userName,
        banTime: banTime,
        untieTime: calculateUnbanTime(data.time),
        banModel: data.banModel
    }
    addMemberMuteLog(param)
}

// 检测敏感词
export function containsSensitiveWords(sensitiveWords, message) {
    for (const wordObject of sensitiveWords) {
        const word = wordObject.wordName
        if (message.includes(word)) {
            return true
        }
    }
    return false
}

// 格式化包含敏感词的文本
function escapeRegExp(string) {
    // 转义字符串中的特殊字符
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function maskText(originalText, sensitiveWords) {
    // 将敏感词按长度排序，以便后面优先匹配长的敏感词
    sensitiveWords.sort((a, b) => b.wordName.length - a.wordName.length);

    // 将匹配到的敏感词替换为相应长度的 "*"
    let maskedText = originalText;
    let matchedWords = [];

    for (const wordObj of sensitiveWords) {
        const word = escapeRegExp(wordObj.wordName); // 使用转义后的敏感词
        const pattern = new RegExp(word, 'g');
        maskedText = maskedText.replace(pattern, match => {
            matchedWords.push(match);
            return '*'.repeat(match.length);
        });
    }
    // 返回一个包含屏蔽后的文本和相关敏感词的对象
    return {
        maskedText,
        matchedWords: matchedWords.join(", ") // 将匹配到的敏感词合并成一个字符串
    };
}

export function isUrl(url) {
    return /(www|\.com|\.cn)/.test(url);
}