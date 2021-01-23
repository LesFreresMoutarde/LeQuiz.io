<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * QuestionPosition
 *
 * @ORM\Table(
 *     name="question_position", indexes={@ORM\Index(name="question_position_position", columns={"position"})})
 * @ORM\Entity(repositoryClass="App\Repository\QuestionPositionRepository")
 */
class QuestionPosition
{
    /**
     * @var string
     *
     * @ORM\Column(name="`questionId`", type="guid", nullable=false)
     * @ORM\Id
//     * @ORM\GeneratedValue(strategy="NONE") PE A UNCOMMENT
//     * @ORM\SequenceGenerator(sequenceName="question_position_questionId_seq", allocationSize=1, initialValue=1)
     */
    private $questionId;

    /**
     * @var int
     *
     * @ORM\Column(name="position", type="integer", nullable=false)
     */
    private $position;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="`createdAt`", type="datetimetz", nullable=false)
     */
    private $createdAt;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="`updatedAt`", type="datetimetz", nullable=false)
     */
    private $updatedAt;

   /**
     * @var Question
     *
     * @ORM\OneToOne(targetEntity="Question", inversedBy="position")
     * @ORM\JoinColumn(name="`questionId`", referencedColumnName="id")
     */
    private $question;

    public function getQuestionId(): ?string
    {
        return $this->questionId;
    }

    public function getPosition(): ?int
    {
        return $this->position;
    }

    public function setPosition(int $position): self
    {
        $this->position = $position;

        return $this;
    }

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

    public function getQuestion(): ?Question
    {
        return $this->question;
    }

    public function setQuestion(?Question $question): self
    {
        $this->question = $question;

        return $this;
    }


}
