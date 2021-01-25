<?php


namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\HasLifecycleCallbacks
 */

abstract class EntityBase
{
    /**
     * @var \DateTime
     *
     * @ORM\Column(name="`createdAt`", type="datetimetz", nullable=false)
     */
    protected $createdAt;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="`updatedAt`", type="datetimetz", nullable=false)
     */
    protected $updatedAt;

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * @ORM\PrePersist
     * @ORM\PreUpdate
     */
    public function updatedTimestamps(): void
    {
        $dateTime = new \DateTime('now', new \DateTimeZone('UTC'));
        $this->setUpdatedAt($dateTime);

        if ($this->getCreatedAt() === null) {
            $this->setCreatedAt($dateTime);
        }
    }
}
