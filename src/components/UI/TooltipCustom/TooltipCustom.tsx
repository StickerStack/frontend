import cn from "classnames";
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from "react";

import { IconButton } from "../IconButton/IconButton";

import styles from "./TooltipCustom.module.scss";

interface IProps {
  className?: string;
  text: string,
}

/* Отступ от правого края экрана */
const SCREEN_PADDING_RIGHT = 10;

const TooltipCustom: React.FC<IProps> = ({ className, text }: IProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [rightOffset, setRightOffset] = useState(0);

  const contentRef = useRef<HTMLDivElement>(null);

  /* Корректировка положения tooltip по правому краю */
  useEffect(() => {
    if (contentRef.current) {
      const offset = contentRef.current.getBoundingClientRect().right + SCREEN_PADDING_RIGHT - window.innerWidth;
      setRightOffset(offset > 0 ? offset : 0);
    }
  }, [isHovered])

  const handleMouseEnter = () => {
    setIsHovered(true);
  }

  const handleMouseLeave = () => {
    setIsHovered(false);
  }

  return (
    <div className={cn(styles.tooltip, className)} onMouseLeave={handleMouseLeave}>
      <IconButton
        className={styles.icon}
        visible={true}
        icon={'tooltip-icon.svg'}
        onMouseEnter={handleMouseEnter}
      />

      <AnimatePresence>
        {
          isHovered && (
            <motion.div
              ref={contentRef}
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 0.2}}
              className={styles.container}
              style={{ left: `-${rightOffset}px`}}
            >
              <div className={styles.content}>
                { text }
              </div>
            </motion.div>
          )
        }
      </AnimatePresence>
    </div>
  );
};

export {TooltipCustom};