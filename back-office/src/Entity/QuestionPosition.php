<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * QuestionPosition
 *
 * @ORM\Table(name="question_position", indexes={@ORM\Index(name="question_position_position", columns={"position"})})
 * @ORM\Entity(repositoryClass="App\Repository\QuestionPositionRepository")
 */
class QuestionPosition extends EntityBase
{
    /**
     * @var string
     *
     * @ORM\Column(name="`questionId`", type="guid", nullable=false)
     * @ORM\Id
     */
    private $questionId;

    /**
     * @var int
     *
     * @ORM\Column(name="position", type="integer", nullable=false)
     */
    private $position;

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
